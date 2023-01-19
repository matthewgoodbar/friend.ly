import { useEffect, useState, useRef } from "react";
import logo from "../../assets/logo-test.png";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { receiveNewMessage, composeMessage } from '../../store/messages';

import dwight from '../../assets/dwight.png'



const DMPartition = ({ contact, setActiveChatRoom }) => {

   // contact is the user's info that is passed in from the chats slice of state


    const chatClickHandler = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setActiveChatRoom("banana")
    }

  return (
    <button onClick={e => { chatClickHandler(e) }}>
        <figure>
            <img src={dwight} alt="Dwight S." />
        </figure>
        <div className="right">
            <div className="name">Dwight S.</div>
        </div>
    </button>
  )
}

export default DMPartition