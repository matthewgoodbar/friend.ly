import React from 'react'
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBarSide from '../NavBarSide/NavBarSide'
import "./Settings.css"

const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [username,setUsername] = useState(user.username)
  const [email,setEmail] = useState(user.email)
  const [zipcode,setZipcode] = useState("94019")
  const [password,setPassword] = useState("")
  return (
    <div className='container settings'> 
          <NavBarSide />

          <div className="content">
            <h1>Settings</h1>
            <form>
                <label>Zipcode
                    <input type="number" onChange={(e)=>setZipcode(e.currentTarget.value)} value={zipcode} />
                </label>
                <label>Username
                    <input type="text" onChange={(e)=>setUsername(e.currentTarget.value)} value={username} />
                </label>
                <label>Email
                    <input type="email" onChange={(e)=>setEmail(e.currentTarget.value)} value={email} />
                </label>
                <label>Password
                    <input type="password" onChange={(e)=>setPassword(e.currentTarget.value)} value={password} />
                </label>
                <button>Save</button>
            </form>
          </div>

    </div>
)
}

export default Settings