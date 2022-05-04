import axios from 'axios'
import { useEffect, useState } from 'react'
import './chatOnline.css'

export default function ChatOnline({onlineUSers,  currentId, setCurrentChat}) {
  const [friends, setFriends] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    const fetchFriends = async() => {
      try {
        const res = await axios.get(`/users/friends/${currentId}`)
        setFriends(res.data)
        console.log({friens:res.data})
      } catch (error) {
        console.log(error);
      }
    }
    fetchFriends()
  }, [currentId])
  
  useEffect(() => {
    setOnlineFriends(friends.filter(f => onlineUSers.includes(f._id)))

  }, [friends, onlineUSers])

  const handlClick = async (user) => {
    try {
      const res = await axios.get(`/conversation/find/${currentId}/${user._id}`)
      console.log(res.data)
      setCurrentChat(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='chatOnline'>
      {
        onlineFriends?.map((o) => (
            <div className="chatOnlineFriend" onClick={() => handlClick(o)}>
                <div className="chatOnlineImgContainer">
                    <img src={o.profilePicture ? PF+ o.profilePicture : PF +"person/noAvatar.png"} alt="" className="chatOnlineImg" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnline">{o.username}</span>
            </div>
        ))
      }
    </div>
  )
}
