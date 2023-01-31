import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './interest.css'
import NavBarSide from '../NavBarSide/NavBarSide'
import interestImg from './interest.png'
import {fetchAllTopics, fetchUserTopics, getTopics, getUserTopics} from "../../store/topics.js";
import SingleInterest from "./SingleInterest.jsx";
import List from './list'
const InterestPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [highlighted,setHighlighted] = useState(false)

    // get all topics from state
    const allTopics = useSelector(getTopics)

    //get current user's himself topics
    const userTopics = useSelector(getUserTopics)
    // console.log(userTopics)

    useEffect( () => {
        dispatch(fetchAllTopics()) 
        dispatch(fetchUserTopics(user._id))    
    }, [])

    
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

    console.log("these are the userTopics",userTopics)
    const showList = userTopics.length === 0;

    return (
        <div className="container interests">
        <NavBarSide />
            <div className="content">
                <aside className="leftSidebar">
                    <div className="innerAside">
                        <div className="title">
                            <h1>My Interests</h1> 
                            <p>Based on your interests we'll select people with similar tastes to put you all into the same group chat.</p>
                            {/* {!user && 
                            <ul className="empty">
                            <li>Please login to add interests</li>
                            </ul>
                        } */}
                            {userTopics.length < 3 && 
                            <>
                                <div className="coverSideBar" onMouseOver={highlightEmpty} onMouseOut={highlightEmpty}></div> 
                                <ul className="empty" id={highlighted ? "highlighted" : ""}>
                                    <li>You need to pick at least 3 interests to join a new chat each day.</li>
                                </ul>
                            </>
                            }
                            
                            {!showList &&
                            <ul>
                            {userTopics.map(
                                (topic, i) => (
                                    <List topic={topic} key={i}/>
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
                    {allTopics.map( (topic, i) => (topic.category === 'Food and Cooking' ?
                            <SingleInterest interest={topic} key={i}/> : null)  
                    )}
                    </div>
                    <h3>Art</h3>
                    <div className="carousel">
                    {allTopics.map( (topic, i) => ( topic.category === 'Art' ?
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