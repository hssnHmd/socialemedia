import './message.css';
import {format} from 'timeago.js'

export default function Message({message,own}) {
  return (
    <div className={own ? 'message own': 'message'}>
        <div className="messageTop">
            <img src="assets/person/2.jpeg" alt="" className="messageImg" />
            <p className="messageText">{message.text}</p>
        </div>
        <span className="messageBottom">
            {format(message.createdAt)}
        </span>
    </div>
  )
}
