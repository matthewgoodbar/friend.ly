import { useEffect, useState, useRef } from "react"; 
import './ChatBox.css';
import logo from "../../assets/logo-test.png";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { receiveNewMessage, fetchChatMessages, composeMessage } from '../../store/messages';
import { changeChatroom, getActiveChatroom, fetchUserChatrooms } from "../../store/chats";

//logos
// import michael from '../../assets/michael.png'
// import dwight from '../../assets/dwight.png'
// import pam from '../../assets/pam.png'
// import angela from '../../assets/angela.png'
// import ryan from '../../assets/ryan.png'


const ChatBox = () => {
  const chatHistory = useRef(null);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const user = useSelector(state => state.session.user)
  const activeChatRoom = useSelector(getActiveChatroom)
  const messages = useSelector(state => Object.values(state.messages.all).reverse());
  
  const [socket] = useState(io("http://localhost:3001", {
    transports: ['websocket']
  }))

  // const handleNewMessage = () => {
  //   chatHistory.current.scrollIntoView({ behavior: "smooth" });
  //   // chatHistory.scrollTop = chatHistory.scrollHeight;
  // };

  useEffect(() => {
    dispatch(fetchChatMessages(activeChatRoom))
    // console.log("new message")
    // chatHistory.scrollTop = chatHistory.scrollHeight;
  }, [activeChatRoom])

  useEffect(()=>{
        chatHistory.current.scrollIntoView({ behavior: "smooth", block:"end" });
  },[messages])

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

  const timeFormat = date=>{
    const dateObject = new Date(date);
    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let ampm = 'AM';
    if (hours >= 12) {
        ampm = 'PM';
        hours = hours % 12;
    }
    if (hours === 0) {
        hours = 12;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return `${hours}:${minutes} ${ampm}`;
  }


  return (
            <main class="messengerComponent">

                    <div class="top">
                        <div class="innerTop">
                            <h4>Thai Food</h4>
                        </div>
                    </div>

                    {/* actual message section */}
                    
                    <div class="bubbles" ref={chatHistory}>

                    {messages.map((message, index) => (

                        <div key={index}  className={message.author.username === user.username ? "message currentUser" : "message"}>

                          <p><strong>{message.author.username}</strong></p>
                          
                          <div class="bubble">
                                <div class="who">
                                    <figure>
                                        <img src={logo} alt="" width="50px"  />
                                    </figure>
                                    <time dateTime={message.createdAt}>{timeFormat(message.createdAt)}</time>
                                </div>

                                <cite>
                                    {message.body}
                                </cite>
                            </div>

                              
                        </div>

                        ))}

                        {/* actual message section */}

                    </div>


                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Type message..." value={text}
                          onChange={handleInputChange} />
                        <button type="submit">
                            <svg width="25" height="20" viewBox="0 0 25 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.90739 19.5045C6.52691 19.7892 6.11202 19.8602 5.66272 19.7175C5.21364 19.5756 4.9263 19.2703 4.8007 18.8016L3.52467 14.0394C3.44474 13.7411 3.4586 13.4519 3.56626 13.1718C3.67392 12.8918 3.86833 12.6798 4.14951 12.536L12.8016 7.75121L2.9163 7.93356C2.60087 7.94957 2.32652 7.86322 2.09326 7.67451C1.86 7.4858 1.7034 7.2423 1.62347 6.944L0.347444 2.18179C0.221839 1.71303 0.317918 1.30453 0.63568 0.956306C0.95367 0.608929 1.34858 0.463377 1.8204 0.51965L23.7351 3.55414C24.3305 3.64579 24.7025 3.96861 24.851 4.5226C24.9994 5.0766 24.8387 5.54215 24.3688 5.91926L6.90739 19.5045Z" fill="currentColor"/>
                            </svg>
                        </button>
                    </form>

                </main>
  );
};

export default ChatBox;