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
  const user = useSelector(state => state.session.user)
  const chats = useSelector(state => state.chats)
  // const [activeChatRoom, setActiveChatRoom] = useState(chats.daily)
  const [activeChatRoom, setActiveChatRoom] = useState("")

  const [socket] = useState(io("http://localhost:3001", {
    transports: ['websocket']
  }))


  useEffect(() => {
    socket.emit("setup", activeChatRoom);
    socket.on("connected", () => console.log("socket connected"));

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on("message recieved", (msgObj) => {
      dispatch(receiveNewMessage(msgObj))
    });

  }, []);



  useEffect(() => {
    dispatch(fetchChatMessages(activeChatRoom))
  }, [activeChatRoom])

  useEffect(()=>{
    dispatch(fetchUserChatrooms(user._id)) 
  },[])


  return (
      <div className='container messages'> 
            {/* <div>MessagesPage</div> */}
            <NavBarSide />

            <div className="content">
        <MessagesLeftSideBar setActiveChatRoom={setActiveChatRoom} usersInChat={"send chats.daily.users array"} />
        <ChatBox activeChatRoom={activeChatRoom} socket={socket}/>
                {/* <MessagesRightSideBar /> */}
                <YelpDataItems/>
            </div>

      </div>
  )
}

export default MessagesPage