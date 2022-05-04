import './online.css'

export default function Online({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <li className="rightbarFriendItem">
        <div className="rightbarProfileContainer">
            <img src={PF+user.profilePicture} alt="" className="rightbarProfileImg" />
            <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">{user.username}</span>
    </li>
  )
}
