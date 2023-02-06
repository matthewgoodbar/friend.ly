import jwtFetch from './jwt';

const CHANGE_CHATROOM = "CHANGE_CHATROOM";
const RECIEVE_USER_CHATROOMS = "RECIEVE_USER_CHATROOMS";

//Actions

export const changeChatroom = chatroomId => ({
    type: CHANGE_CHATROOM,
    chatroomId
});

const receiveUserChatrooms = chatrooms => ({
    type: RECIEVE_USER_CHATROOMS,
    chatrooms
});

// UseSelector

export const getActiveChatroom = (state) => {
    if (state.chats && state.chats.active) return state.chats.active
    return null
}

// export const joinChat = user => startSession(user, 'api/users/register');


//Thunk action Creators

export const fetchUserChatrooms = (userId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/chats/user/${userId}`);
        const chatrooms = await res.json();
        dispatch(receiveUserChatrooms(chatrooms));
        return chatrooms
    } catch (err) {
        console.log("error in fetchUserChatrooms")
    }
};

export const changeUserChatroom = (socket, chatId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/users/chatswap/`, {
            method: 'PATCH',
            body: JSON.stringify({chatId})
        });
        const chatrooms = await res.json();
        dispatch(receiveUserChatrooms(chatrooms));
        socket.emit("transition chatroom", chatId )
        return chatrooms
    } catch (err) {
        console.log("error in changeUserChatroom")
    }
};


export const joinQueue = () => async dispatch => {
    try {
        const res = await jwtFetch(`/api/users/enqueue`);
        const backendResponse = await res.json();
        return backendResponse
    } catch (err) {
        console.log("error in JoinQueue")
    }
};

const chatsReducer = (state = {}, action) => {
    switch (action.type) {

        case RECIEVE_USER_CHATROOMS:
            return action.chatrooms

        default:
            return state;
    }
};

export default chatsReducer;