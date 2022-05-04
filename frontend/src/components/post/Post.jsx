import { MoreVert } from '@mui/icons-material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import {format} from  'timeago.js'
import { AuthContext } from '../../context/AuthContext';
import './post.css'

const PF = process.env.REACT_APP_PUBLIC_FOLDER
export default function Post({post}) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({})
    const {user: currentUser} = useContext(AuthContext)

    useEffect(() => {
      setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])
    
    const handlLike = async () => {
        try {
            await axios.put(`posts/${post._id}/like`, {userId: currentUser._id})
        } catch (error) {
            console.log(error)
        }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
        
    }


  useEffect(() => {
    const fetchUser = async() => {
      const res = await axios.get(`/users?userId=${post.userId}`) 
      setUser(res.data);
    }
    fetchUser()
  }, [post.userId])
  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`/profile/${user.username}`}>
                        <img src={user.profilePicture ? PF+user.profilePicture : PF +"person/noAvatar.png"} className='postProfileImg' alt="" />
                    </Link>
                    <span className='postUsername'>{user.username}</span>
                    <span className='postDate'>{format(post.createdAt)}</span>
                </div>
                <div className="postTopright">
                    <MoreVert/>
                </div>
            </div> 
            <div className="postCenter">
                <span className="postCenterText">{post?.comment}</span>
                <img src={PF+post.image} alt="" className="postCenterImg"/>
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src="/assets/like.png" className="postLike" alt="" onClick={handlLike}/>
                    <img src="/assets/heart.png" className="postLike" alt="" onClick={handlLike}/>
                    <span className="postBottomLikeCount">{like} likes</span>
                </div>
                <div className="postBottomRight">
                    <span className='postBottomRightComment'>{post.comment.lenght} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
