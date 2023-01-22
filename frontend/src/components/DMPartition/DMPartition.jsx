import { useEffect, useState, useRef } from "react";
import logo from "../../assets/logo-test.png";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { receiveNewMessage, composeMessage } from '../../store/messages';
import dwight from '../../assets/dwight.png'
import { createFriendship, destroyFriendship } from "../../store/friendships";



const DMPartition = ({ contact, setActiveChatRoom }) => {
  const chatId = contact.chatId
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  const chatClickHandler = (e) => {
      e.stopPropagation()
      e.preventDefault()
      if (chatId) {
        setActiveChatRoom(chatId)
      }
  }

  

  const createConnection = () => {
    dispatch(createFriendship({ userId: user._id, contactId: contact._id })).then(()=>{

    })
  }

  const closeConnection = () => {
    dispatch(destroyFriendship({ userId: user._id, contactId: contact._id })).then(() => {

    })
  }

  return (
    <button onClick={e => { chatClickHandler(e) }}>
        <figure>
        <img src={contact.image} alt={contact.username} />
        </figure>
        <div className="right">
        <div className="name">{contact.username}</div>
        {contact.friendship === "neutral" && (<span onClick={e => { createConnection(e) }}>request chat</span>)}
        {contact.friendship === "requested" && (<span onClick={e => { createConnection(e) }}>wants to chat</span>)}
        {contact.friendship === "friend" && (<span onClick={e => { closeConnection(e) }}>remove friend</span>)}
        {contact.friendship === "awaiting" && (<span onClick={e => { closeConnection(e) }}>cancel request</span>)}
        </div>
    </button>
  )
}

export default DMPartition