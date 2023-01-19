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
  // const [activeChatRoom, setActiveChatRoom] = useState(chats.daily)
  const [activeChatRoom, setActiveChatRoom] = useState("")

  const [socket] = useState(io("http://localhost:3001", {
    transports: ['websocket']
  }))

  useEffect(() => {
    // socket.emit("setup", activeChatRoom);

    socket.on("message recieved", (msgObj) => {
      dispatch(receiveNewMessage(msgObj))
    });
  }, []);


  useEffect(() => {
    // socket.emit("setup", activeChatRoom);
    console.log("in socket connector")
    console.log(chats)

    // socket.on("message recieved", (msgObj) => {
    //   dispatch(receiveNewMessage(msgObj))
    // });
  }, []);




  useEffect(() => {
    dispatch(fetchChatMessages(activeChatRoom))
  }, [activeChatRoom])

  useEffect(()=>{
    // dispatch(fetchUserChatrooms(user._id)) 
    dispatch(fetchUserChatrooms(user._id)).then(()=>{

    })
      // console.log("in fetch UC then");
      // console.log(chats)
      //iterate through chats and connect all of the sockets to the ID's

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