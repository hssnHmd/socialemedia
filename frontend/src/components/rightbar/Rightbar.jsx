import { Add, Remove } from '@mui/icons-material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { Users } from '../../dummyData'
import Online from '../online/Online'
import  './rightbar.css'


const PF = process.env.REACT_APP_PUBLIC_FOLDER
export default function Rightbar({user}) {
  const [friendList, setFriendList] = useState([]);
  const {user: curretUser, dispatch} = useContext(AuthContext);
  const [followed, setFollowed] = useState(curretUser.folowins.includes(user?._id))



  useEffect(() => {
      const fetchFriends = async () => {
        try {
          const friends = await axios.get(`/users/friends/${user?._id}`)
          setFriendList(friends.data) 
        } catch (error) {
          console.log(error)
        }
      }
      fetchFriends()
    }, [user?._id])

    const handlFollowing = async (e) => {
      e.preventDefault()
      try {
        if(followed){
        await axios.put(`/users/${user?._id}/unfollow`, {userId: curretUser._id})
        dispatch({type:"UN_FOLLOW", payload:user._id})
        }else{
        await axios.put(`/users/${user?._id}/follow`, {userId: curretUser._id})
        dispatch({type:"FOLLOW", payload:user._id})
        }
      } catch (error) {
        console.log(error);
      }
      setFollowed(!followed)
    }

  const HomeRightbar = () => {

    return (
      <>
          <div className="birthdayContainer">
            <img src="assets/gift.png" alt="" className="birthdayImg" />
            <span className="birthdayText">
              <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
            </span>
          </div>
          <img src="assets/ad.png" alt="" className="rightbarAd" />
          <h4 className="rightbarTitle">Online friends</h4>
          <ul className="rightbarFriendList">
            {
              Users.map((u) => (
                <Online user={u} key={u.id}/>
              ))
            } 
          </ul>
      </>
    )
  }

  const ProfileRightbar = () => { 
    return (
      <>
        {user.username !== curretUser.username && (
          <button className="rightbarFollowBtn" onClick={handlFollowing}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove/> : <Add/>} 
          </button>
        ) }
        <h4 className="rightbarTitle"> User information </h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoitems">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoitems">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoitems">
            <span className="rightbarInfoKey">RelashionShip:</span>
            <span className="rightbarInfoValue">{user.relationShip === 1 ? "Single" :user.relationShip === 2 ? "Married" : "_" }</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {
            friendList.map((friend) => (
              <div className="rightbarFollowing" key={friend._id}>
                <Link to={`/profile/${friend.username}`}>
                  <img src={PF+friend.profilePicture} alt="" className="rightbarFollowingImg"/>
                </Link>
                <span className="rightbarFollowingName">{friend.username}</span>
              </div> 
            ))
          }
          
        </div>
      </>
    )
  }
  return (
    <div className='rightbar'>
        <div className="rightbarWrapper">
         {
           user ? <ProfileRightbar/> : <HomeRightbar/>
         }
        </div>
    </div>
  )
}
