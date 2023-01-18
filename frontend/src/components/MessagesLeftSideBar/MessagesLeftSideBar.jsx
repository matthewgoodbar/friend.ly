import React from 'react'
import './MessagesLeftSideBar.css'


//logos
import thai from '../../assets/thai.png'
import michael from '../../assets/michael.png'
import dwight from '../../assets/dwight.png'
import pam from '../../assets/pam.png'
import angela from '../../assets/angela.png'

const MessagesLeftSideBar = () => {
  return (
    <aside class="leftSidebar">
                    <div class="innerAside">
                        <div class="title">
                            <h1>Messages</h1> 
                            <small>3 new</small>
                        </div>
                        <div class="day">
                            <small class="uppercase">16/365</small>
                            <h2>Jan 16<sup>th</sup></h2>
                        </div>
                        <div class="groupChat">
                            <h3 class="uppercase">Group Chat</h3>
                            <button class="">
                                <figure>
                                    <img src={thai} alt="Thai Food" />
                                </figure>
                                <div>
                                    <div class="name">Thai Food</div>
                                    <div class="location">
                                        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 6.11465C5.34375 6.11465 5.63812 5.9948 5.88313 5.75511C6.12771 5.51582 6.25 5.22803 6.25 4.89172C6.25 4.55541 6.12771 4.26741 5.88313 4.02772C5.63812 3.78843 5.34375 3.66879 5 3.66879C4.65625 3.66879 4.36208 3.78843 4.1175 4.02772C3.8725 4.26741 3.75 4.55541 3.75 4.89172C3.75 5.22803 3.8725 5.51582 4.1175 5.75511C4.36208 5.9948 4.65625 6.11465 5 6.11465ZM5 12C4.91667 12 4.83333 11.9847 4.75 11.9541C4.66667 11.9236 4.59375 11.8828 4.53125 11.8318C3.01042 10.5172 1.875 9.29692 1.125 8.17101C0.375 7.04469 0 5.99236 0 5.01401C0 3.48535 0.502708 2.26752 1.50813 1.36051C2.51313 0.453503 3.67708 0 5 0C6.32292 0 7.48688 0.453503 8.49187 1.36051C9.49729 2.26752 10 3.48535 10 5.01401C10 5.99236 9.625 7.04469 8.875 8.17101C8.125 9.29692 6.98958 10.5172 5.46875 11.8318C5.40625 11.8828 5.33333 11.9236 5.25 11.9541C5.16667 11.9847 5.08333 12 5 12Z" fill="black"/>
                                        </svg>
                                        <span>San Francisco</span>
                                    </div>
                                    <div class="time">Expires in <span>09:43:20</span></div>
                                </div>
                            </button>
                        </div>
                        <div class="directMessages">
                            <h3 class="uppercase">Direct Messages</h3>
                            <button class="active unread">
                                <figure>
                                    <div class="online"></div>
                                    <img src={michael} alt="Michael Scott" />
                                </figure>
                                <div class="right">
                                    <div class="name">Michal Scott</div>
                                    <div class="messagePreview">I can't, I have improv class tonight lorem ipsum</div>
                                </div>
                            </button>
                            <button>
                                <figure>
                                    <img src={dwight} alt="Dwight S." />
                                </figure>
                                <div class="right">
                                    <div class="name">Dwight S.</div>
                                    <span>Request to chat</span>
                                </div>
                            </button>
                            <button>
                                <figure>
                                    <div class="online"></div>
                                    <img src={pam} alt="Pam B." />
                                </figure>
                                <div>
                                    <div class="name">Pam B.</div>
                                    <span>Request to chat</span>
                                </div>
                            </button>
                            <button class="awaiting">
                                <figure>
                                    <img src={angela} alt="Angela M." />
                                </figure>
                                <div>
                                    <div class="name">Angela M.</div>
                                    <span>Awaiting response</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </aside>
  )
}

export default MessagesLeftSideBar