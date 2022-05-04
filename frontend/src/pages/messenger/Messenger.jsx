import './messenger.css'
import Conversation from '../../components/conversation/Conversation'
import Topbar from '../../components/topbar/Topbar'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import {io} from 'socket.io-client'

export default function Messenger() {
    const {user} = useContext(AuthContext)
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const socket = useRef()
    const scrollRef = useRef()

    useEffect(() => {
      socket.current = io("ws://localhost:8900")
      socket.current.on("getMessage", (data) => {
          setArrivalMessage({
              sender: data.senderId,
              text: data.text,
              createdAt:Date.now(),
          })
      })
    }, [])
    useEffect(() => {
        arrivalMessage && 
        currentChat?.members.includes(arrivalMessage.sender) && 
        setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() => {
      socket.current.emit('addUser', user._id)
      socket.current.on("getUsers", users =>{ 
          setOnlineUsers(
              user.folowins.filter(f => users.some(u => u.userId === f) )
          )
      })
    }, [user._id, user.folowins]) 
    useEffect(() => {
      const getConversation = async () => {
            try {
                const res = await axios.get(`/conversation/${ user._id}`)
                setConversations(res.data.conversation); 
            } catch (error) {
                console.log(error)
            }            
        }
        getConversation()
    }, [user._id])

    const handleMessage = async (e) => {
        e.preventDefault()
        const newMsg = {
            sender:user._id,
            text: newMessage,
            conversationId: currentChat._id,
        }
        const receiverId = currentChat.members?.find(
            (member) => member !== user._id
        );
        socket.current.emit("sendMessage", {
            senderId : user._id,
            receiverId,
            text: newMessage, 
        })
        try {
            const res = await axios.post('/message', newMsg)
            setMessages([...messages, res.data.savedMessage])
            setNewMessage('')
        } catch (error) {
            console.log(error);
        }
    } 

    useEffect(() => {
        const getMessage = async () => {
            try {
                const res = await axios.get(`/message/${currentChat?._id}`)
                setMessages(res.data.Message)
            } catch (error) {
                console.log(error);
            }
        }
        getMessage()
    }, [currentChat])
    
    

    useEffect(() => {
     scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])
    
  return (
    <>
       <Topbar/>
       <div className="messenger">
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input type="text" placeholder='Search for friends' className="chatMenuInput" />
                {
                    conversations?.map((c, index) => ( 
                        <div onClick={() => setCurrentChat(c)} key={index}>
                            <Conversation conversation={c} currentUser={user} /> 
                        </div>
                    ))
                }  
            </div>
        </div>
        <div className="chatBox">
            <div className="chatBoxWrapper">
                {
                    currentChat ? 
                        <>
                            <div className="chatBoxTop">
                                {
                                    messages.map((m, idx) => (
                                        <div ref={scrollRef} key={idx}>
                                            <Message message={m} own={m.sender === user._id}/>
                                        </div>
                                    ))
                                }  
                            </div>
                            <div className="chatBoxBootom">
                                <textarea
                                    placeholder='write something ...'
                                    className='chatBoxBootomInput'
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    value={newMessage}
                                ></textarea>
                                <button className="chatBoxBottomBtn" onClick={handleMessage}>Send</button>
                            </div> 
                        </>
                        :
                        <span className="noConversation">No Conversation, start one now</span>
                }
            </div>
        </div>
        <div className="chatOnline">
            <div className="chatOnlineWrapper">
                <ChatOnline onlineUSers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/> 
            </div>
        </div>
        </div> 
    </>
  )
}
