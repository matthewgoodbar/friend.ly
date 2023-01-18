import { useEffect, useState } from "react"; import './ChatBox.css';
import logo from "../../assets/logo-test.png";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { receiveNewMessage, fetchChatMessages, composeMessage } from '../../store/messages';
import { changeChatroom, getActiveChatroom, fetchUserChatrooms } from "../../store/chats";

//logos
import michael from '../../assets/michael.png'
import dwight from '../../assets/dwight.png'
import pam from '../../assets/pam.png'
import angela from '../../assets/angela.png'
import ryan from '../../assets/ryan.png'


const ChatBox = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const user = useSelector(state => state.session.user)
  const activeChatRoom = useSelector(getActiveChatroom)

  const messages = useSelector(state => Object.values(state.messages.all));
  
  const [socket] = useState(io("http://localhost:3001", {
    transports: ['websocket']
  }))

  useEffect(() => {
    dispatch(fetchChatMessages(activeChatRoom))
  }, [activeChatRoom])

  // room is hard coded for demo. Buttons to enter chat rooms need to know the chat room code
  // and clicking on them needs to dispatch changeChatRoom and fetchChatMessages()
  // we will use the "active" chatroom in state (the chatroom ID) to correctly map the messages 
  // into that chatroom component. 

  useEffect(() => {
    dispatch(fetchUserChatrooms(user._id)).then(() => dispatch(changeChatroom("000000012792ed64ba9393af"))); 
    socket.emit("setup", user);
    socket.on("connected", () => console.log("socket connected"));

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on("message recieved", (msgObj) => {
      dispatch(receiveNewMessage(msgObj))
    });

  }, []);

  // Keep - convert to timestamps once messages are in state
  const messageTimeOptions = {hour: 'numeric', minute: 'numeric', hour12: true}

  const handleSubmit = event => {
    event.preventDefault();
    socket.emit("new message", { body: text, author: { username: user.username, _id: user._id }, chat: "000000012792ed64ba9393af", createdAt: new Date()});
    dispatch(composeMessage({ body: text, chat: activeChatRoom, author: user._id }));
    setText("");
  };

  const handleInputChange = event => {
    setText(event.target.value);
  };


  return (
            <main class="messengerComponent">
                    <div class="top">
                        <div class="innerTop">
                            <h4>Thai Food</h4>
                            <div>
                                <button class="participants">
                                    5 participants 
                                    <svg width="13" height="7" viewBox="0 0 13 7" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.7427 1.3871L6.98021 6.82258C6.91161 6.8871 6.83729 6.93269 6.75726 6.95935C6.67722 6.98645 6.59147 7 6.5 7C6.40853 7 6.32278 6.98645 6.24274 6.95935C6.16271 6.93269 6.08839 6.8871 6.01979 6.82258L0.240106 1.3871C0.0800352 1.23656 7.09723e-08 1.04839 7.3665e-08 0.82258C7.63577e-08 0.596773 0.0857521 0.403225 0.257256 0.241935C0.42876 0.0806445 0.628848 -7.08141e-07 0.85752 -7.05414e-07C1.08619 -7.02688e-07 1.28628 0.0806445 1.45778 0.241935L6.5 4.98387L11.5422 0.241935C11.7023 0.0913973 11.8994 0.0161282 12.1336 0.0161282C12.3682 0.0161282 12.5712 0.0967734 12.7427 0.258064C12.9142 0.419354 13 0.607526 13 0.82258C13 1.03763 12.9142 1.22581 12.7427 1.3871Z" fill="currentColor"/>
                                    </svg>
                                    </button>
                                <button class="more">...</button>
                            </div>
                        </div>
                    </div>
                    <div class="bubbles">
                        <div class="message">
                            <span>Dwight S.</span>
                            <div class="bubble">
                                <div class="who">
                                    <figure>
                                        <img src={dwight} alt="Dwight S." />
                                    </figure>
                                    <time datetime="2008-02-14 20:00">10:45</time>
                                </div>
                                <cite>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </cite>
                            </div>
                        </div>
                        <div class="message currentUser">
                            <span>Me</span>
                            <div class="bubble">
                                <div class="who">
                                    <figure>
                                        <img src={ryan} alt="Ryan" />
                                    </figure>
                                    <time datetime="2008-02-14 20:00">10:45</time>
                                </div>
                                <cite>
                                    Phasellus sit amet aliquet mi.
                                </cite>
                            </div>
                        </div>
                        <div class="message">
                            <span>Me</span>
                            <div class="bubble">
                                <div class="who">
                                    <figure>
                                        <img src={michael} alt="Michael Scott" />
                                    </figure>
                                    <time datetime="2008-02-14 20:00">10:45</time>
                                </div>
                                <cite>
                                    Phasellus sit amet aliquet mi.
                                </cite>
                            </div>
                        </div>
                        <div class="message">
                            <span>Pam B.</span>
                            <div class="bubble">
                                <div class="who">
                                    <figure>
                                        <img src={pam} alt="Pam B." />
                                    </figure>
                                    <time datetime="2008-02-14 20:00">10:45</time>
                                </div>
                                <cite>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </cite>
                            </div>
                        </div>
                        <div class="message">
                            <span>Angela M.</span>
                            <div class="bubble">
                                <div class="who">
                                    <figure>
                                        <img src={angela} alt="Angela M." />
                                    </figure>
                                    <time datetime="2008-02-14 20:00">10:45</time>
                                </div>
                                <cite>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </cite>
                            </div>
                        </div>
                        <div class="message">
                            <span>Dwight S.</span>
                            <div class="bubble">
                                <div class="who">
                                    <figure>
                                        <img src={dwight} alt="Dwight S." />
                                    </figure>
                                    <time datetime="2008-02-14 20:00">10:45</time>
                                </div>
                                <cite>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </cite>
                            </div>
                        </div>
                        <div class="message currentUser">
                            <span>Me</span>
                            <div class="bubble">
                                <div class="who">
                                    <figure>
                                        <img src={ryan} alt="Ryan" />
                                    </figure>
                                    <time datetime="2008-02-14 20:00">10:45</time>
                                </div>
                                <cite>
                                    Phasellus sit amet aliquet mi.
                                </cite>
                            </div>
                        </div>
                        <div class="message">
                            <span>Pam B.</span>
                            <div class="bubble">
                                <div class="who">
                                    <figure>
                                        <img src={pam} alt="Pam B." />
                                    </figure>
                                    <time datetime="2008-02-14 20:00">10:45</time>
                                </div>
                                <cite>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </cite>
                            </div>
                        </div>
                    </div>
                    <form>
                        <input type="text" placeholder="Type message..." />
                        <button>
                            <svg width="25" height="20" viewBox="0 0 25 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.90739 19.5045C6.52691 19.7892 6.11202 19.8602 5.66272 19.7175C5.21364 19.5756 4.9263 19.2703 4.8007 18.8016L3.52467 14.0394C3.44474 13.7411 3.4586 13.4519 3.56626 13.1718C3.67392 12.8918 3.86833 12.6798 4.14951 12.536L12.8016 7.75121L2.9163 7.93356C2.60087 7.94957 2.32652 7.86322 2.09326 7.67451C1.86 7.4858 1.7034 7.2423 1.62347 6.944L0.347444 2.18179C0.221839 1.71303 0.317918 1.30453 0.63568 0.956306C0.95367 0.608929 1.34858 0.463377 1.8204 0.51965L23.7351 3.55414C24.3305 3.64579 24.7025 3.96861 24.851 4.5226C24.9994 5.0766 24.8387 5.54215 24.3688 5.91926L6.90739 19.5045Z" fill="currentColor"/>
                            </svg>
                        </button>
                    </form>
                </main>
  );
};

export default ChatBox;