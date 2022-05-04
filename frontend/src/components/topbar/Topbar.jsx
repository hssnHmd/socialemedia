import {Link} from 'react-router-dom';
import { Chat, Notifications, Person, Search } from '@mui/icons-material'
import './topbar.css'
import { useContext } from 'react';
import {AuthContext} from '../../context/AuthContext'

const PF = process.env.REACT_APP_PUBLIC_FOLDER

export default function Topbar() {
    const {user} = useContext(AuthContext) 
  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
            <Link to='/' style={{textDecoration:"none"}}> 
                <span className="logo">hssnSocial</span>
            </Link>
        </div>
        <div className="topbarCenter">
            <div className="searchbar">
                <Search/>
                <input placeholder='Search ...' className='searchInput' />
            </div>
        </div>
        <div className="topbarRight">
            <div className="topbarLinks">
                <span className="topbarLink">HomePage</span>
                <span className="topbarLink">TimeLine</span>
            </div>
            <div className="topbarIcons">
                <div className="topbarIconItem">
                    <Person/>
                    <span className="topbarIconBadge">1</span>
                </div>
                <div className="topbarIconItem">
                    <Chat/>
                    <span className="topbarIconBadge">5</span>
                </div>
                <div className="topbarIconItem">
                    <Notifications/>
                    <span className="topbarIconBadge">1</span>
                </div>
            </div>
            <Link to={`/profile/${user.username}`}>
                <img src={user.profilePicture ? PF+user.profilePicture : PF +"person/noAvatar.png"} alt="" />
            </Link>
        </div>
    </div>
  )
}
