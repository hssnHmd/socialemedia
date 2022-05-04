import axios from 'axios'
import { useEffect, useState } from 'react'
import './conversation.css'

const PF = process.env.REACT_APP_PUBLIC_FOLDER

export default function Conversation({conversation, currentUser}) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const friendId = conversation.members.find((f) => f !== currentUser._id)

    const getUser = async() => {
      try {
        const res = await axios.get(`/users?userId=${friendId}`) 
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser()
  }, [conversation.members, currentUser._id])

  return (  
          <div className='conversation'>
            <img src={user?.profilePicture?  PF + user.profilePicture : PF +"person/noAvatar.png"} alt="" className="conversationImg" />
            <span className="conversationName">{user?.username}</span>
          </div> 
  )
}
