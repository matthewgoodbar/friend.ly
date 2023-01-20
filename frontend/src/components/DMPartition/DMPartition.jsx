import { useEffect, useState, useRef } from "react";
import logo from "../../assets/logo-test.png";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { receiveNewMessage, composeMessage } from '../../store/messages';

import dwight from '../../assets/dwight.png'



const DMPartition = ({ contact, setActiveChatRoom }) => {

  const chatId = contact.chatId

    const chatClickHandler = (e) => {
        e.stopPropagation()
        e.preventDefault()
        if (chatId) {
          setActiveChatRoom(chatId)
        }
    }

  return (
    <button onClick={e => { chatClickHandler(e) }}>
        <figure>
        <img src={contact.image} alt={contact.username} />
        </figure>
        <div className="right">
        <div className="name">{contact.username}</div>
        {!chatId && (<span>request chat</span>)}
        </div>
    </button>
  )
}

export default DMPartition