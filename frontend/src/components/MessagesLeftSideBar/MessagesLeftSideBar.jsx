import React from 'react'
import Countdown from '../Counters/Countdown'
import DayCounter from '../Counters/DayCounter'
import CurrentDate from '../Counters/CurrentDate'
import './MessagesLeftSideBar.css'
import DMPartition from '../DMPartition/DMPartition'
import { useDispatch, useSelector } from "react-redux";


//logos
import thai from '../../assets/thai.png'
import michael from '../../assets/michael.png'
import dwight from '../../assets/dwight.png'
import pam from '../../assets/pam.png'
import angela from '../../assets/angela.png'

const MessagesLeftSideBar = ({ setActiveChatRoom, chats }) => {
    const user = useSelector(state => state.session.user)

    // const end = new Date();
    // end.setHours(23, 59, 59, 999);

    // const timer = setInterval(() => {
    // const now = new Date();
    // const distance = end - now;
  
    // if (distance < 0) {
    //     clearInterval(timer);
    //     console.log("The day has ended!");
    //     return;
    // }
  
    // const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    // const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    // return (`${hours}:${minutes}:${seconds}`)
    // // console.log(`Time left until end of day: ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
    // }, 1000);

    const chatSidebarAggregator = () => {
        // look in chats.chats and identify the names of the users that have active dm chats with main user
        // look in chats.dailys and make an array object that contains the chatId

        const dmContacts = {}
        chats.chats.forEach((dmChat)=> {
            dmChat.users.forEach((dmChatUser)=> {
                if (dmChatUser.username !== user.username) {
                    dmContacts[dmChatUser.username] = { ...dmChatUser, chatId: dmChat._id}
                    }
            })
        })

        const dailyContactsNoDM = {}
        chats.daily.users.forEach((dailyChatUser) => {
            if (dailyChatUser.username !== user.username && !dmContacts[dailyChatUser.username] ) {
                dailyContactsNoDM[dailyChatUser.username] = { ...dailyChatUser, chatId: null}
            }
        })

        const allContacts = []
        for (let key in dmContacts) {
            allContacts.push(dmContacts[key])
        }
        for (let key in dailyContactsNoDM) {
            allContacts.push(dailyContactsNoDM[key])
        }

        
        return allContacts.map((contact, i) => {
            if (user._id !== contact._id) {
                return <DMPartition key={i} contact={contact} setActiveChatRoom={setActiveChatRoom} />
            }
        })
        
    }



    const chatClickHandler = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setActiveChatRoom(chats.daily._id)
    }

  return (
    <aside className="leftSidebar">
                    <div className="innerAside">
                        <div className="title">
                            <h1>Messages</h1> 
                            <small>3 new</small>
                        </div>
                        <div className="day">
                            <small className="uppercase"><DayCounter /></small>
                            <h2><CurrentDate /></h2>
                        </div>
                        <div className="groupChat">
                            <h3 className="uppercase">Group Chat</h3>
                  <button className="" onClick={e => { chatClickHandler(e) }}>
                                <figure>
                                    <img src={thai} alt="Thai Food" />
                                </figure>
                                <div>
                                    <div className="name">Thai Food</div>
                                    <div className="location">
                                        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 6.11465C5.34375 6.11465 5.63812 5.9948 5.88313 5.75511C6.12771 5.51582 6.25 5.22803 6.25 4.89172C6.25 4.55541 6.12771 4.26741 5.88313 4.02772C5.63812 3.78843 5.34375 3.66879 5 3.66879C4.65625 3.66879 4.36208 3.78843 4.1175 4.02772C3.8725 4.26741 3.75 4.55541 3.75 4.89172C3.75 5.22803 3.8725 5.51582 4.1175 5.75511C4.36208 5.9948 4.65625 6.11465 5 6.11465ZM5 12C4.91667 12 4.83333 11.9847 4.75 11.9541C4.66667 11.9236 4.59375 11.8828 4.53125 11.8318C3.01042 10.5172 1.875 9.29692 1.125 8.17101C0.375 7.04469 0 5.99236 0 5.01401C0 3.48535 0.502708 2.26752 1.50813 1.36051C2.51313 0.453503 3.67708 0 5 0C6.32292 0 7.48688 0.453503 8.49187 1.36051C9.49729 2.26752 10 3.48535 10 5.01401C10 5.99236 9.625 7.04469 8.875 8.17101C8.125 9.29692 6.98958 10.5172 5.46875 11.8318C5.40625 11.8828 5.33333 11.9236 5.25 11.9541C5.16667 11.9847 5.08333 12 5 12Z" fill="black"/>
                                        </svg>
                                        <span>San Francisco</span>
                                    </div>
                                    <div className="time"><span><Countdown /></span></div>
                                </div>
                            </button>
                        </div>
                        <div className="directMessages">
                            {chatSidebarAggregator()}
                        </div>
                    </div>
                </aside>
  )
}

export default MessagesLeftSideBar