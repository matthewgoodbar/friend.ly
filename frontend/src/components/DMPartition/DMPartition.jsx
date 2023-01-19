import { useEffect, useState, useRef } from "react";
import './ChatBox.css';
import logo from "../../assets/logo-test.png";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { receiveNewMessage, composeMessage } from '../../store/messages';

import dwight from '../../assets/dwight.png'



const DMPartition = () => {


  return (
    <button>
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