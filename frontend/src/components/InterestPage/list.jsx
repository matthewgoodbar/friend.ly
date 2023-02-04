import {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserTopic } from "../../store/topics";
const List = ({ topic, setActiveChatName }) => {
    const user = useSelector(state => state.session.user)
    
    const dispatch = useDispatch();

    const removeUserInterest = (e) => {
        e.stopPropagation()
        e.preventDefault()
        dispatch(deleteUserTopic(user._id, topic._id))
        // if user removes the current set chat, it needs to transition to a different chat. 
    }


    return (
        <li onClick={() => { setActiveChatName(topic.name) }} title={`${topic.name} - ${topic.category}`}>
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