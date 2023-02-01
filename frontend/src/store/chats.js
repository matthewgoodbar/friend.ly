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
    }
};

export const joinQueue = () => async dispatch => {
    try {
        const res = await jwtFetch(`/api/users/enqueue`);
        // const resClone = res.clone();
        const backendResponse = await res.json();
        return backendResponse
    } catch (err) {
        console.log("error in JoinQueue")
        // const resBody = await err.json();
        // if (resBody.statusCode === 400) {
        //     dispatch(receiveErrors(resBody.errors));
        // }
    }
};



// const userDevHardCode = [
//     { _id: '63caed634a586ee5b3330a4b', username: 'matthew', image: 'https://i.imgur.com/YiWuKeh.jpg', friendships: []},
//     { _id: '63cd83fe2bdf7ad71e45cc2e', username: 'marcos', image: 'https://i.imgur.com/zxiytKs.jpg', friendships: [] },
//     { _id: '63caed634a586ee5b3330a4d', username: 'vivian', image: 'https://i.imgur.com/DN8158s.jpg', friendships: [] },
//     { _id: '63caed634a586ee5b3330a4e', username: 'evgenii', image: 'https://i.imgur.com/XNPUclU.jpg', friendships: ['63cd83fe2bdf7ad71e45cc2e'] },
//     { _id: '63caed634a586ee5b3330a4f', username: 'diego', image: 'https://i.imgur.com/sClpoq6.jpg', friendships: ['63cd83fe2bdf7ad71e45cc2e'] }
// ]


// const evaluateFriendships = (usersInChat) => {
//     usersInChat.forEach(()=>{

//     })
// }

//Regular Reducer

const chatsReducer = (state = {}, action) => {
    switch (action.type) {

        case RECIEVE_USER_CHATROOMS:
            return action.chatrooms

        default:
            return state;
    }
};

export default chatsReducer;