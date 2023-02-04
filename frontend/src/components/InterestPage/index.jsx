import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './interest.css'
import NavBarSide from '../NavBarSide/NavBarSide'
import interestImg from './interest.png'
import {deleteUserTopic, fetchAllTopics, fetchUserTopics, getTopics, getUserTopics} from "../../store/topics.js";

import SingleInterest from "./SingleInterest.jsx";
import List from './list'
import { useHistory } from 'react-router-dom';

import {changeUserChatroom, fetchUserChatrooms,joinQueue} from "../../store/chats";

const InterestPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [highlighted,setHighlighted] = useState(false)
    const history = useHistory()
    const allTopics = useSelector(getTopics)
    const [activeChatName, setActiveChatName] = useState("")
    const userTopics = useSelector(getUserTopics)

    useEffect( () => {
        dispatch(fetchAllTopics()) 
        dispatch(fetchUserTopics(user._id))
        dispatch(fetchUserChatrooms(user._id)).then((chats) => {
            if (chats.daily) {
                setActiveChatName(chats.daily.topic.name)
            } else {

            }
        })    
    }, [])


    useEffect(() => {
        if (userTopics.length === 1 && !activeChatName) {
            dispatch(changeUserChatroom(userTopics[0].chat))
            setActiveChatName(userTopics[0].name)
        }
    }, [userTopics])

    
    const findObjectWithId =(arr, id) => {
        const objWithIdIndex = arr.findIndex((obj) => obj._id === id);
        if (objWithIdIndex > -1) {
            return true
        }
        return false
    }

    const highlightEmpty = () => {
        setHighlighted(!highlighted)
    }

    const handleJoin =()=>{
        history.push('/')
    }



    const removeUserInterestHandler = (topic) => {
        dispatch(deleteUserTopic(user._id, topic._id)).then((userTopicRes)=>{
            console.log(userTopicRes)
            let chatId = userTopicRes[0]?.chat || null
            if (activeChatName === topic.name) {
                console.log(chatId)
                dispatch(changeUserChatroom(chatId))
                if (chatId)  {
                    setActiveChatName(userTopicRes[0].name)
                } else {
                    setActiveChatName("")
                }
                
            } 
        })
    }

    const showList = userTopics.length === 0;
    return (
        <div className="container interests">
        <NavBarSide />
            <div className="content">
                <aside className="leftSidebar">
                    <div className="innerAside">
                        <div className="title">
                            <h1>My Interests</h1> 
                            <p>Choose your favorite topics and we'll pair you with people who love what you love.</p>
                            {/* {!user && 
                            <ul className="empty">
                            <li>Please login to add interests</li>
                            </ul>
                        } */}
                            {userTopics.length < 1 ? 
                            <>
                                <div className="coverSideBar" onMouseOver={highlightEmpty} onMouseOut={highlightEmpty}></div> 
                                <ul className="empty" id={highlighted ? "highlighted" : ""}>
                                    <li>You need to pick at least one interest to join the chat.</li>
                                </ul>
                            </>
                            :

                            <>
                                {activeChatName && (<button id="join-chat-btn" onClick={handleJoin}>{`${activeChatName} Chat`}</button>)}
                            </>
                            }
                            
                            {!showList &&
                            <ul>
                            {userTopics.map(
                                (topic, i) => (
                                    <List topic={topic} setActiveChatName={setActiveChatName} removeUserInterestHandler={removeUserInterestHandler}key={i}/>
                                )
                            )}
                            </ul>
                            }
                            
                        </div>

                    </div>
                </aside>
                <main className="interestsComponent">
                    <h2>Discover new interests</h2>
                    <h3>Outdoors/Activities</h3>
                    <div className="carousel">
                    {allTopics.map( (topic, i) => 
                    // if topic's category is falling in the <h3></h3> and user's topics not includes this topic
                    (topic.category ==='Outdoor Activities' && !findObjectWithId(userTopics, topic._id) ?
                            <SingleInterest interest={topic} key={i}/> :null)  
                    )}
                    </div>

                    <h3>Sports and Hobbies</h3>
                    <div className="carousel">
                    {allTopics.map( (topic, i) => 
                    // if topic's category is falling in the <h3></h3> and user's topics not includes this topic
                    (topic.category ==='Sports and Hobbies' && !findObjectWithId(userTopics, topic._id) ?
                            <SingleInterest interest={topic} key={i}/> :null)  
                    )}
                    </div>
                    <h3>Food</h3>
                    <div className="carousel">
                    {allTopics.map( (topic, i) => 
                    (topic.category === 'Food and Cooking' && !findObjectWithId(userTopics, topic._id)?
                            <SingleInterest interest={topic} key={i}/> : null)  
                    )}
                    </div>
                    <h3>Art</h3>
                    <div className="carousel">
                    {allTopics.map( (topic, i) => 
                    ( topic.category === 'Art' && !findObjectWithId(userTopics, topic._id)?
                            <SingleInterest interest={topic} key={i}/> : null)  
                    )}
                    </div>

                    
                    <h3>Games</h3>
                    <div className="carousel">
                    {allTopics.map( (topic, i) => 
                    ( topic.category === 'Games' && !findObjectWithId(userTopics, topic._id) ?
                            <SingleInterest interest={topic} key={i}/> : null)  
                    )}
                    </div>
                </main>
                
            </div>
        </div>
    )
}




export default InterestPage