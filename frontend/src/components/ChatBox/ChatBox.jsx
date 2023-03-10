import { useEffect, useState, useRef } from "react"; 
import './ChatBox.css';
import { useDispatch, useSelector } from "react-redux";
import { receiveNewMessage, composeMessage } from '../../store/messages';
import Message from "../Message/Message";


//logos
// import michael from '../../assets/michael.png'
// import dwight from '../../assets/dwight.png'
// import pam from '../../assets/pam.png'
// import angela from '../../assets/angela.png'
// import ryan from '../../assets/ryan.png'


const ChatBox = ({ activeChatRoom, messages, socket, mainChatBool }) => {
  const chatHistory = useRef(null);
  const lastMessage = useRef(null);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const chats = useSelector(state => state.chats)
  const user = useSelector(state => state.session.user)

  const [inputValue, setInputValue] = useState('');

  useEffect(()=>{
    if(lastMessage.current){
      lastMessage.current.scrollIntoView({ behavior: "smooth", block:"end" });
    }
}, [messages])

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(composeMessage(socket, activeChatRoom, { body: text, chat: activeChatRoom, author: user._id }));
    setText("");
    setInputValue("");
  };

  const handleInputChange = event => {
    setText(event.target.value);
    setInputValue(event.target.value);
  };

    

const bannerName = () => {
  if (chats.chats.length === 0 && !mainChatBool) return "You haven't connected with anyone yet"
  if (!activeChatRoom) return "Click on a friend to chat with them"


  if (activeChatRoom === chats.daily._id) {
    return `You are all interested in ${chats.daily.topic.name}`
  } else {
    let tempName = ""
    chats.chats.forEach(dm => {
      if (dm?._id === activeChatRoom) {
        if (dm.users[0].username === user.username) {
          tempName = dm.users[1].username
        } else {
          tempName = dm.users[0].username
        }
      }
    })
    return `Private chat with ${tempName}`
  }
}

  return (
            <main className="messengerComponent">

                    <div className="top">
                        <div className="innerTop">
                        <h4>{bannerName()}</h4>
                        </div>
                    </div>
                    
                    <div className="bubbles" ref={chatHistory}>

                      { messages.map((message, index) =>  {
                        if (message.chat === activeChatRoom) {
                          return <Message key={index} message={message} activeChatRoom={activeChatRoom} socket={socket}/>
                        }
                      })}
                          
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Type message..." value={text}
                          onChange={handleInputChange} maxLength="400" />
                          <span id="symbols-counter">{inputValue.length}/400</span>
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