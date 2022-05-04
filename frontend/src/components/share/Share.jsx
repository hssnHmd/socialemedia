import { Cancel, EmojiEmotions, Label, PermMedia, Room } from '@mui/icons-material'
import axios from 'axios'
import { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './share.css'


const PF = process.env.REACT_APP_PUBLIC_FOLDER
export default function Share() {

    const {user} = useContext(AuthContext)
    const [file, setFile] = useState(null)
    const desc = useRef()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const newPost = {
            userId: user._id,
            comment: desc.current.value, 
        }
       if(file){
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append('name', fileName);
        data.append('file', file);
        newPost.image = fileName
        console.log(newPost)
        try {
            await axios.post('/upload', data)
        } catch (error) {
            console.log(error)
        }
       }
        try {
            await axios.post('/posts', newPost)
            window.location.reload();
        } catch (error) {
            
        }
    }
  return ( 
      <div className="share">
          <div className="shareWrapper">
              <div className="shareTop">
                  <img src={PF+ user.profilePicture} alt="" className="shareProfileImg" />
                  <input type="text" placeholder={"Whate's in your mind " + user.username + " ?"} ref={desc} className="shareInput" />
              </div>
              <hr className='shareHr' />
                  {
                      file && (
                          <div className="shareImageContainer">
                              <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                              <Cancel className='shareCancelImg' onClick={() => setFile(null)}/>
                          </div>
                      )
                  }
              <form className="shareBottom" onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="shareOptions">
                    <label className="shareOption" htmlFor='file'>
                        <PermMedia htmlColor='tomato'/>
                        <span className="shareOptionText">Photo / Video</span>
                        <input style={{display:'none'}} type="file" id='file' accept='.png,.jpeg,.jpg' onChange={(e) => setFile(e.target.files[0])} />
                    </label>
                    <div className="shareOption">
                        <Label htmlColor='blue'/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor='green'/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor='goldenrod'/>
                        <span className="shareOptionText">Feeling</span>
                    </div>
                  </div>
                  <button className="shareBtn" type='submit'>Share</button>
              </form>
          </div>
      </div>
  )
}
