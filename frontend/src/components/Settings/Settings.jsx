import React from "react"
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBarSide from "../NavBarSide/NavBarSide"
import "./Settings.css"
import ZipCodeInput from "../GeoLocation/ZipCodeInput";
import {updateUser} from "../../store/session"

const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [username,setUsername] = useState(user.username)
  const [image,setImage] = useState(user.image)
  const [email,setEmail] = useState(user.email)
  const [zipCode,setZipCode] = useState(user.location.zip)
  const [city,setCity] = useState(user.location.city)
  const [password,setPassword] = useState("")
  const [passwordConfirmation,setPasswordConfirmation] = useState("")
  const [error, setError] = useState("");
  const [personalInfoFormReady,setPersonalInfoFormReady] = useState(false);
  const [locationFormReady,setLocationFormReady] = useState(false);
  const [passwordFormReady,setPasswordFormReady] = useState(false);
  const [tab,setTab] = useState("location");
  const demoUser = user.email === "evgenii@friend.ly"

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab==="location") {
      let editedUser = {
        location: {
          zip: zipCode,
          city
        }
      }
      dispatch(updateUser(editedUser,user._id))

    } else if (tab === "personalInfo") {
      let newEmail = email
      if (demoUser) newEmail = "evgenii@friend.ly"
      let editedUser = {
        username,
        email: newEmail,
        image,
        location: {
          zip: zipCode,
          city
        },
        password
      }
      dispatch(updateUser(editedUser,user._id)).then(()=>{
        console.log("submited personalInfo form")
      })
      

    } else if (tab === "password") {
      let editedUser = {
        password
      }
      dispatch(updateUser(editedUser,user._id))

    }
  }


  useEffect(()=>{
    if (zipCode.toString().length===5 && city) {
      setLocationFormReady(true)
    } else {
      setLocationFormReady(false)
    }
  },[zipCode,city,tab])

  useEffect(()=>{
    if (email && username) {
      setPersonalInfoFormReady(true)
    } else {
      setPersonalInfoFormReady(false)
    }
  },[email,username])

  useEffect(()=>{
    if (password.length>=8 && password===passwordConfirmation) {
      setPasswordFormReady(true)
    } else {
      setPasswordFormReady(false)
    }
  },[password,passwordConfirmation])


  return (
    <div className="container settings"> 
        <NavBarSide />
          <div className="content">
            <h1>Settings</h1>

            <div className="tabs">
              <button onClick={()=>setTab("location")} className={ tab === "location" ? "active" : null }>Location</button>
              <button onClick={()=>setTab("personalInfo")} className={ tab === "personalInfo" ? "active" : null }>Personal Info</button>
              <button onClick={()=>setTab("password")} className={ tab === "password" ? "active" : null }>Password</button>
            </div>

            { tab === "location" && (
              <form onSubmit={handleSubmit}>
                  <ZipCodeInput city={city} setCity={setCity} zipCode={zipCode} setZipCode={setZipCode}  error={error} setError={setError}/>
                  <div>
                      <label>City (you don't need to set this)<br/>
                          <input type="text" onChange={(e)=>setCity(e.currentTarget.value)} value={city} disabled />
                      </label>
                      <div className="error">{error?.image}</div>
                  </div>
                  <button disabled={locationFormReady ? null : "disabled"}>Save</button>
              </form>
            )}

            { tab === "personalInfo" && (
              <form onSubmit={handleSubmit}>
              {demoUser && (<div className="alert">The email of the demo user can't be changed</div>)}
                  <div>
                      <label>Username<br/>
                          <input type="text" onChange={(e)=>setUsername(e.currentTarget.value)} value={username} placeholder="Type your username here" required />
                      </label>
                      <div className="error">{error?.username}</div>
                  </div>
                  <div>
                      <label>Email<br/>
                          <input type="email" onChange={(e)=>setEmail(e.currentTarget.value)} value={email} placeholder="email@example.com" required disabled={demoUser ? "disabled" : ""} />
                      </label>
                      <div className="error">{error?.email}</div>
                  </div>
                  <div>
                      <label>Profile Picture<br/>
                          <input type="text" onChange={(e)=>setImage(e.currentTarget.value)} value={image} placeholder="URL of your profile picture" />
                      </label>
                      <div className="error">{error?.image}</div>
                  </div>
                  <button disabled={personalInfoFormReady ? null : "disabled"}>Save</button>
              </form>
            )}

            { tab === "password" && (
              <form onSubmit={handleSubmit}>
                  {demoUser && (<div className="alert">This feature is disabled for the demo user</div>)}
                  <div>
                      <label>New password<br/>
                          <input type="password" onChange={(e)=>setPassword(e.currentTarget.value)} value={password} placeholder="Type new password" required disabled={demoUser ? "disabled" : ""} />
                      </label>
                      <div className="error">{error?.password}</div>
                  </div>
                  <div>
                      <label>Confirm new password<br/>
                          <input type="password" onChange={(e)=>setPasswordConfirmation(e.currentTarget.value)} value={passwordConfirmation} placeholder="Type new password again" required disabled={demoUser ? "disabled" : ""} />
                      </label>
                      <div className="error">{error?.password}</div>
                  </div>

                  <button disabled={passwordFormReady && !demoUser ? null : "disabled"}>Save</button>
              </form>
            )}

          </div>

    </div>
)
}

export default Settings



{/* <div>
<label>Password<br/>
    <input type="password" onChange={(e)=>setPassword(e.currentTarget.value)} value={password} required />
</label>
<div className="error">{error?.password}</div>
</div> */}