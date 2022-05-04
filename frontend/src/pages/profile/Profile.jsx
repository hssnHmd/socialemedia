import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import './profile.css';

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [user, setUser] = useState({})
  const username = useParams().username; 

  useEffect(() => {
    const fetchUser = async() => {
      const res = await axios.get(`/users?username=${username}`) 
      setUser(res.data);
    }
    fetchUser()
  }, [username])
  return (
    <>
      <Topbar/>
      <div className="profileContainer">
        <Sidebar/>
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profleCover">
                    <img src={user.coverPicture ? PF+user.coverPicture : PF + "person/noCover.png"} alt="" className='profileCoverImg'/>
                    <img src={user.profilePicture ?PF+user.profilePicture : PF + "person/noAvatar.png"} alt=""className='profileUserImg' />
                </div>
                <div className="profileInfo">
                    <h4 className="profileUsername">{user.username}</h4>
                    <span className="profileDesc">{user.desc}</span>
                </div>
            </div>
            <div className="profileRightBottom">
                <Feed username={username}/>
                <Rightbar user={user}/>
            </div>
        </div>
      </div>
    </>
  )
}
