import { useEffect, useState } from "react"; import './ChatBox.css';
import logo from "../../assets/logo-test.png";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { receiveNewMessage, fetchChatMessages, composeMessage } from '../../store/messages';
import { changeChatroom, getActiveChatroom, fetchUserChatrooms } from "../../store/chats";


const ChatBox = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const user = useSelector(state => state.session.user)
  const activeChatRoom = useSelector(getActiveChatroom)

  const messages = useSelector(state => Object.values(state.messages.all));
  
  const [socket] = useState(io("http://localhost:3000", {
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
    <div className="chatbox-wrapper">
        <div className="chatbox-header">
            <h2>Thai food</h2>
            <h6>Chat 3</h6>
            <h6>Chat 4</h6>
            <h6>Chat 5</h6>
        </div>

      <div className="chatbox-messages-wrapper">
        {messages.map((message, index) => (

          <div key={index}  className={message.author.username === currentUser.username ? "chatbox-messages-details-right-side" : "chatbox-messages-details-left-side"}>
            
                <div className="sender-message">
                     {message.body}
                </div>

                <div className="sender-info">
                    <strong>{message.author.username}</strong>
                    <img src={logo} alt="" width="50px" />
                    {/* <p>{message.createdAt}</p> */}
                </div>
                
          </div>

        ))}
      </div>


      <form onSubmit={handleSubmit}>
          
        <br />
        <label>
          Message:
          <input
            type="text"
            value={text}
            onChange={handleInputChange}
            placeholder="Enter your message"
          />
        </label>
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;