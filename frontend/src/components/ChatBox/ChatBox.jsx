import React, { useState } from "react";
import './ChatBox.css';
import logo from "../../assets/logo-test.png";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [error, setError] = useState(null);

//   const messageTime = `${new Date().getHours()}:${new Date().getMinutes()}`
  const messageTimeOptions = {hour: 'numeric', minute: 'numeric', hour12: true}

  const handleSubmit = event => {
    event.preventDefault();
    if (!currentUser) {
      setError("Please enter a username.");
    } else if (!inputValue) {
      setError("Please enter a message.");
    } else {
      setError(null);
      const newMessage = {
        text: inputValue,
        timestamp: new Date().toLocaleString('en-US',messageTimeOptions),
        // timestamp: messageTime,
        user: currentUser
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleUsernameChange = event => {
    setCurrentUser(event.target.value);
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

          <div key={index}  className={message.user === currentUser ? "chatbox-messages-details-right-side" : "chatbox-messages-details-left-side"}>
            
                <div className="sender-message">
                     {message.text}
                </div>

                <div className="sender-info">
                    <strong>{message.user}</strong>
                    <img src={logo} alt="" width="50px" />
                    <p>{message.timestamp}</p>
                </div>
                
          </div>

        ))}
      </div>


      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
            
        <label>
          Username:
          <input
            type="text"
            value={currentUser}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
          />
        </label>

        <br />
        <label>
          Message:
          <input
            type="text"
            value={inputValue}
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