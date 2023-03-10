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

  const mainChatBool = window.location.pathname === "/messages-page"

  useEffect(() => {
    if (chats.daily && mainChatBool) {
      setActiveChatRoom(chats.daily._id)
    } else {
      setActiveChatRoom(null)
    }

  }, [chats, mainChatBool])


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

      socket.on("fetch chatrooms", ({ allBool, userId, contactId}) => {

        if (allBool) {
          dispatch(fetchUserChatrooms(user._id))
        } else {
          if (contactId === user._id || userId === user._id) {
            dispatch(fetchUserChatrooms(user._id)).then((chatrooms) => {
              chatrooms.chats.forEach((chatroom) => {
                socket.emit("leave", chatroom._id)
                socket.emit("setup", chatroom._id)
              })
            })
          }
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
            {chats && chats.daily && (<MessagesLeftSideBar setActiveChatRoom={setActiveChatRoom} chats={chats} socket={socket} mainChatBool={mainChatBool} />)}
            <ChatBox activeChatRoom={activeChatRoom} messages={messages} socket={socket} mainChatBool={mainChatBool}/>
                  { mainChatBool && (<YelpDataItems props={chats.daily.topic}/>)}
                </div>

          </div>
      )
    } else {
      
    }
}

export default MessagesPage