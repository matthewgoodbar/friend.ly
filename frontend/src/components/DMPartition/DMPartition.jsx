import { useEffect, useState, useRef } from "react";
import logo from "../../assets/logo-test.png";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { receiveNewMessage, composeMessage } from '../../store/messages';
import dwight from '../../assets/dwight.png'
import { createFriendship, destroyFriendship } from "../../store/friendships";
import { fetchUserChatrooms } from "../../store/chats";
import './DMPartition.css'



const DMPartition = ({ contact, setActiveChatRoom, socket}) => {
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

  const createConnection = (e) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(createFriendship({ userId: user._id, contactId: contact._id }, socket)).then(()=>{
      dispatch(fetchUserChatrooms(user._id))
    })
  }

  const closeConnection = (e) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(destroyFriendship({ userId: user._id, contactId: contact._id }, socket)).then(() => {
      dispatch(fetchUserChatrooms(user._id))
    })
  }

  const initial = contact.username.split('')[0].toUpperCase()
  const firstLetter = contact.username.split('')[0].toLowerCase()
  const alphbet ='abcdefghijklnmopqrstuvwxyz'
  const indexOfFirst = alphbet.indexOf(firstLetter)
  const colors = ['#14eecd', '#d170d0', '#8a2be2', '#ffd700','#f1908e','#aa00ff', '#14f111','#e86e4d','#cb4273'];
  // const random_color = colors[Math.floor(Math.random() * colors.length)];
  const random_color = colors[indexOfFirst % colors.length]

  return (
    <button className={contact.friendship} onClick={e => { chatClickHandler(e) }}>
        <figure>
        {contact.image ? <img src={contact.image} alt={contact.username} /> :
            <div className="letter-avatar" style={{backgroundColor: random_color}}>{initial}</div>
            }
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