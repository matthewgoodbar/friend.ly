import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react"; 
import { editMessage, deleteMessage } from '../../store/messages';



const Message = ({ message, activeChatRoom, socket }) => {

    const chatHistory = useRef(null);
    const lastMessage = useRef(null);

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [isEdit, setIsEdit] = useState(false)
    const [editedText, setEditedText] = useState(message.body)

    useEffect(()=>{
        if(lastMessage.current){
          lastMessage.current.scrollIntoView({ behavior: "smooth", block:"end" });
        }
    }, [message])


    const alphbet ='abcdefghijklnmopqrstuvwxyz'
    const firstLetter = message.author.username[0].toLowerCase();
    const indexOfFirst = alphbet.indexOf(firstLetter)

    const colors = ['#14eecd', '#d170d0', '#8a2be2', '#ffd700','#f1908e','#aa00ff', '#14f111','#e86e4d','#cb4273'];
    // const random_color = colors[Math.floor(Math.random() * colors.length)];
    const random_color = colors[indexOfFirst % colors.length]

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
        <div ref={lastMessage} className={message.author.username === user.username ? "message currentUser" : "message"}>
            <p><strong>{message.author.username}</strong></p>
            <div className="bubble">
                <div className="who">
                    <figure>
                        {message.author.image ? <img src={message.author.image} alt={message.author.username} /> :
                            <div className="letter-avatar-chat" style={{ backgroundColor: random_color }}>{message.author.username[0].toUpperCase()}</div>
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