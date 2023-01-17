import "./Chatbox-Prototype.css"
import { useEffect, useState } from "react";
import TweetBox from "./Message-Prototype";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { receiveNewMessage, fetchChatMessages, composeMessage } from '../../store/messages';
import { changeChatroom, getActiveChatroom } from "../../store/chats";

function ChatboxPrototype() {
    const user = useSelector(state => state.session.user)
    const activeChatRoom = useSelector(getActiveChatroom)

    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const errors = useSelector(state => state.errors.tweets);

    const [socket] = useState(io("http://localhost:3000", {
        transports: ['websocket']
    }))

    const messages = useSelector(state => Object.values(state.messages.all));

    useEffect(() => {
        // dispatch(fetchChatMessages(activeChatRoom));
        socket.emit("setup", user);
        socket.on("connected", () => console.log("socket connected"));

        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });

        socket.on("message recieved", (msgObj) => {
            dispatch(receiveNewMessage(msgObj))
        });

    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(composeMessage({ text, chat: activeChatRoom }));
        socket.emit("new message", { text, author: { username: user.username }, chat: activeChatRoom, id: user._id });
        setText('');
    };

    const update = e => setText(e.currentTarget.value);



    const chatRoomChangeHandler = (e, chatNum) => {
        e.stopPropagation()
        dispatch(changeChatroom(chatNum))
    }


    return (
        <>
            <p>Demo Chat Box</p>
            <div id="Room-Button-Container">
                <div className="Room-Button" id={activeChatRoom == 1 ? "Active-Chat-Room" : ""} onClick={(e) => chatRoomChangeHandler(e, 1)}>1</div>
                <div className="Room-Button" id={activeChatRoom == 2 ? "Active-Chat-Room" : ""} onClick={(e) => chatRoomChangeHandler(e, 2)}>2</div>
                <div className="Room-Button" id={activeChatRoom == 3 ? "Active-Chat-Room" : ""} onClick={(e) => chatRoomChangeHandler(e, 3)}>3</div>
                <div className="Room-Button" id={activeChatRoom == 4 ? "Active-Chat-Room" : ""} onClick={(e) => chatRoomChangeHandler(e, 4)}>4</div>
            </div>
            <div id="demoChatBox">
                {messages.map((message, i) => {
                    if (message.chat == activeChatRoom) return <TweetBox key={i} text={message.text} username={message.author.username} />
                })}
            </div>
            <form className="composeTweet" onSubmit={handleSubmit}>
                <input
                    type="textarea"
                    value={text}
                    onChange={update}
                    placeholder="Write your tweet..."
                />
                <div className="errors">{errors && errors.text}</div>
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}

export default ChatboxPrototype;