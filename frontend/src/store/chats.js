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


//Thunk action Creators

export const fetchUserChatrooms = (userId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/chats/user/${userId}`);
        const resClone = res.clone()
        const chatrooms = await res.json();
        dispatch(receiveUserChatrooms(chatrooms));
        return resClone
    } catch (err) {
        console.log("error in fetchUserChatrooms")
        // const resBody = await err.json();
        // if (resBody.statusCode === 400) {
        //     dispatch(receiveErrors(resBody.errors));
        // }
        //adding this line just to commit
    }
};

//Regular Reducer

const chatsReducer = (state = {}, action) => {
    switch (action.type) {

        case RECIEVE_USER_CHATROOMS:
            return { ...action.chatrooms };

        default:
            return state;
    }
};

export default chatsReducer;