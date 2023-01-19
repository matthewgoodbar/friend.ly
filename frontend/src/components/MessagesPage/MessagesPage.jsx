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
  // const activeChatRoom = useSelector(getActiveChatroom)
  const dispatch = useDispatch();
  const chats = useSelector(state => state.chats)
  const user = useSelector(state => state.session.user)
  const [activeChatRoom, setActiveChatRoom] = useState("")
  const [setupCounter, setSetupCounter] = useState(0)

  const [socket] = useState(io("http://localhost:3001", {
    transports: ['websocket']
  }))

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
    })
  },[])


  return (
      <div className='container messages'> 
            {/* <div>MessagesPage</div> */}
            <NavBarSide />

            <div className="content">
                { chats && chats.daily && (<MessagesLeftSideBar setActiveChatRoom={setActiveChatRoom} chats={chats} />)}
                <ChatBox activeChatRoom={activeChatRoom} socket={socket}/>
                {/* <MessagesRightSideBar /> */}
                <YelpDataItems/>
            </div>

      </div>
  )
}

export default MessagesPage