import React from 'react'
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBarSide from '../NavBarSide/NavBarSide'
import MessagesLeftSideBar from '../MessagesLeftSideBar/MessagesLeftSideBar'
import ChatBox from '../ChatBox/ChatBox'
import MessagesRightSideBar from '../MessagesRightSideBar/MessagesRightSideBar'
import YelpDataItems from '../YelpFetchData/YelpDataItems'
import { changeChatroom, getActiveChatroom, fetchUserChatrooms } from "../../store/chats";
import { fetchChatMessages, receiveNewMessage, receiveEditedMessage, removeMessage } from '../../store/messages';
import "./MessagesPage.css"
import socket from '../../utils/socket';


const MessagesPage = () => {
  const dispatch = useDispatch();
  const chats = useSelector(state => state.chats)
  const user = useSelector(state => state.session.user)
  const messages = useSelector(state => Object.values(state.messages.all).sort((a,b) => a.createdAt - b.createdAt));

  const [activeChatRoom, setActiveChatRoom] = useState("")

  useEffect(() => {
    dispatch(fetchChatMessages(activeChatRoom))
  }, [activeChatRoom])

  useEffect(()=>{
    dispatch(fetchUserChatrooms(user._id)).then(async (chatrooms)=>{
      setActiveChatRoom(chatrooms.daily._id)

      socket.emit("setup", chatrooms.daily._id)

      chatrooms.chats.forEach((chatroom)=>{
        socket.emit("setup", chatroom._id)
      })

      socket.on("message recieved", (msgObj) => {
        dispatch(receiveNewMessage(msgObj))
      });

      socket.on("message edited", (msgObj) => {
        dispatch(receiveEditedMessage(msgObj))
      });

      socket.on("message deleted", (msgId) => {
        dispatch(removeMessage(msgId))
      });

      socket.on("fetch chatrooms", ({ userId, contactId}) => {
        if (contactId === user._id || userId === user._id) {
          dispatch(fetchUserChatrooms(user._id)).then(async (chatrooms) => {

            chatrooms.chats.forEach((chatroom) => {
              socket.emit("leave", chatroom._id)
              socket.emit("setup", chatroom._id)
            })
          })
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
            {chats && chats.daily && (<MessagesLeftSideBar setActiveChatRoom={setActiveChatRoom} chats={chats} socket={socket} />)}
                  <ChatBox activeChatRoom={activeChatRoom} messages={messages} socket={socket}/>
                  <YelpDataItems props={chats.daily.topic}/>
                </div>

          </div>
      )
    }
}

export default MessagesPage