import {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserTopic } from "../../store/topics";
const List = ({topic}) => {
    const user = useSelector(state => state.session.user)
    
    const dispatch = useDispatch();

    const removeUserInterest = (e) => {
        e.preventDefault()
        dispatch(deleteUserTopic(user._id, topic._id))
    }


    return (
        <li title="Indonesian (Food)">
            <span>{topic.name}
                <small>{topic.category}</small>
            </span> 
            <button>... 
                <div 
                    className="remove" 
                    onClick={removeUserInterest}
                >Not interest anymore
                </div>    
            </button>
        </li>
    )
}

export default List