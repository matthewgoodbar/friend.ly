import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"; 
import { editMessage, deleteMessage } from '../../store/messages';



const Message = ({ message, activeChatRoom, socket }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [isEdit, setIsEdit] = useState(false)
    const [editedText, setEditedText] = useState(message.body)

    const colors = ['#14eecd', '#d170d0', '#8a2be2', '#ffd700'];
    const random_color = colors[Math.floor(Math.random() * colors.length)];


    const timeFormat = date => {
        const dateObject = new Date(date);
        let hours = dateObject.getHours();
        let minutes = dateObject.getMinutes();
        let ampm = 'AM';
        if (hours >= 12) {
            ampm = 'PM';
            hours = hours % 12;
        }
        if (hours === 0) {
            hours = 12;
        }
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return `${hours}:${minutes} ${ampm}`;
    }

    const setEditClickHandler = (e) => {
        e.stopPropagation()
        setIsEdit(!isEdit)
    }

    const deleteClickHandler = (e) => {
        e.stopPropagation()
        dispatch(deleteMessage(socket, activeChatRoom, { _id: message._id }))

    }

    const submitEditMessage = (e) => {
        e.stopPropagation()
        e.preventDefault()
        dispatch(editMessage(socket, activeChatRoom, { _id: message._id, body: editedText }))
        setIsEdit(false)
    }


  return (
      <div className={message.author.username === user.username ? "message currentUser" : "message"}>
          <p><strong>{message.author.username}</strong></p>
          <div className="bubble">
              <div className="who">
                  <figure>
                      {message.author.image ? <img src={message.author.image} alt={message.author.username} /> :
                          <div className="letter-avatar" style={{ backgroundColor: random_color }}>{message.author.username[0].toUpperCase()}</div>
                      }
                  </figure>
                  <time dateTime={message.createdAt}>{timeFormat(message.createdAt)}</time>
              </div>
              {isEdit && (
                  <cite>
                      <textarea cols="30" rows="10" value={editedText} onChange={e => setEditedText(e.target.value) }></textarea>
                      <button onClick={e => { submitEditMessage(e) }}>edit</button>
                  </cite>
              )}

              {!isEdit && (
                  <cite>
                      {message.body}
                  </cite>
              )}

          </div>
          {message.author._id === user._id && (<div onClick={e => setEditClickHandler(e)}>edit</div>)}
          {message.author._id === user._id && (<div onClick={e => deleteClickHandler(e)}>delete</div>)}
          {message.createdAt !== message.updatedAt && (<div>edited</div>)}
      </div>
  )
}

export default Message