import React from 'react'
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBarSide from '../NavBarSide/NavBarSide'
import MessagesLeftSideBar from '../MessagesLeftSideBar/MessagesLeftSideBar'
import ChatBox from '../ChatBox/ChatBox'
import MessagesRightSideBar from '../MessagesRightSideBar/MessagesRightSideBar'
import YelpDataItems from '../YelpFetchData/YelpDataItems'
import { changeChatroom, getActiveChatroom, fetchUserChatrooms } from "../../store/chats";
import { fetchChatMessages, receiveNewMessage } from '../../store/messages';
import io from "socket.io-client";
import "./MessagesPage.css"

const MessagesPage = () => {
  const dispatch = useDispatch();
  const chats = useSelector(state => state.chats)
  const user = useSelector(state => state.session.user)
  const messages = useSelector(state => Object.values(state.messages.all).sort((a,b) => a.createdAt - b.createdAt));

  const [activeChatRoom, setActiveChatRoom] = useState("")
  const [setupCounter, setSetupCounter] = useState(0)

  let socket;
  if (process.env.NODE_ENV === "production") {
   socket = io()
  } else {
    socket = io("http://localhost:5001", {
      transports: ['websocket']
    })
  }





  useEffect(() => {
    dispatch(fetchChatMessages(activeChatRoom))
  }, [activeChatRoom])

  useEffect(()=>{
    dispatch(fetchUserChatrooms(user._id)).then( async (res)=>{
      const chatrooms = await res.json()
      setActiveChatRoom(chatrooms.daily._id)

      socket.emit("setup", chatrooms.daily._id)

      chatrooms.chats.forEach((chatroom)=>{
        socket.emit("setup", chatroom._id)
      })

      socket.on("message recieved", (msgObj) => {
        dispatch(receiveNewMessage(msgObj))
      });

      socket.on("fetchYourChatrooms", (contactId) => {
        if (contactId === user._id) {
          dispatch(fetchUserChatrooms(user._id))
        }
      });
    })

    return (()=>{
      socket.disconnect()
    })

    },[])

    if (chats.daily) {
      return (
          <div className='container messages'> 
                <NavBarSide />

                <div className="content">
                  { chats && chats.daily && (<MessagesLeftSideBar setActiveChatRoom={setActiveChatRoom} chats={chats} />)}
                  <ChatBox activeChatRoom={activeChatRoom} messages={messages} socket={socket}/>
                  <YelpDataItems props={chats.daily.topic}/>
                </div>

          </div>
      )
    }
}

export default MessagesPage