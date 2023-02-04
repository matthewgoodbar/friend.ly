import {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserChatroom, fetchUserChatrooms } from "../../store/chats";
import { deleteUserTopic } from "../../store/topics";

const List = ({ topic, setActiveChatName, removeUserInterestHandler }) => {
    const user = useSelector(state => state.session.user)

    const dispatch = useDispatch();

    const removeUserInterest = (e) => {
        e.stopPropagation()
        e.preventDefault()
        removeUserInterestHandler(topic)
    }


    const swapActiveChat = (e) => {
        console.log(topic.chat)
        e.stopPropagation()
        e.preventDefault()
        dispatch(changeUserChatroom(topic.chat)).then(()=>{
            dispatch(fetchUserChatrooms(user._id))
            setActiveChatName(topic.name)
        })
    }


    return (
        <li onClick={swapActiveChat} title={`${topic.name} - ${topic.category}`}>
            <span>{topic.name}
                <small>{topic.category}</small>
            </span> 
            <button>... 
                <div 
                    className="remove" 
                    onClick={removeUserInterest}
                >Not interested anymore
                </div>    
            </button>
        </li>
    )
}

export default List