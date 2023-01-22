import React from 'react'
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBarSide from '../NavBarSide/NavBarSide'
import "./Settings.css"
import {clearSessionErrors} from '../../store/session';

const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [username,setUsername] = useState(user.username)
  const [email,setEmail] = useState(user.email)
  const [zipcode,setZipcode] = useState("94019")
  const [password,setPassword] = useState("")
  const errors = useSelector(state => state.errors.session);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("submit form")
  }

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  return (
    <div className='container settings'> 
          <NavBarSide />

          <div className="content">
            <h1>Settings</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Zipcode<br/>
                        <input type="number" onChange={(e)=>setZipcode(e.currentTarget.value)} value={zipcode} />
                    </label>
                    <div className="errors">{errors?.zipcode}</div>
                </div>
                <div>
                    <label>Username<br/>
                        <input type="text" onChange={(e)=>setUsername(e.currentTarget.value)} value={username} />
                    </label>
                    <div className="errors">{errors?.username}</div>
                </div>
                <div>
                    <label>Email<br/>
                        <input type="email" onChange={(e)=>setEmail(e.currentTarget.value)} value={email} />
                    </label>
                    <div className="errors">{errors?.email}</div>
                </div>
                <div>
                    <label>Password<br/>
                        <input type="password" onChange={(e)=>setPassword(e.currentTarget.value)} value={password} />
                    </label>
                    <div className="errors">{errors?.password}</div>
                </div>
                
                <button>Save</button>
            </form>
          </div>

    </div>
)
}

export default Settings