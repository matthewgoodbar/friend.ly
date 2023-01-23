import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_CHAT_MESSAGES = "RECEIVE_CHAT_MESSAGES";
const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";

//Actions

const receiveChatMessages = chatMessages => ({
  type: RECEIVE_CHAT_MESSAGES,
  chatMessages
});

export const receiveNewMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});


//Thunk action Creators

export const fetchChatMessages = (chatId) => async dispatch => {
    try {
      const res = await jwtFetch(`/api/messages/chat/${chatId}`);
      const messages = await res.json();
      dispatch(receiveChatMessages(messages));
    } catch (err) {
      console.log("error in fetchChatMessages")
      // const resBody = await err.json();
      // if (resBody.statusCode === 400) {
      //   dispatch(receiveErrors(resBody.errors));
      // }
    }
  };
  
export const composeMessage = (socket, activeChatRoom, data) => async dispatch => {
    try {
      const res = await jwtFetch(`/api/messages/chat/${data.chat}`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
      const message = await res.json();
      socket.emit("new message", { message, activeChatRoom });
    } catch(err) {
      console.log("error in composeMessage")
      // const resBody = await err.json();
      // if (resBody.statusCode === 400) {
      //   return dispatch(receiveErrors(resBody.errors));
      // }
    }
  };

//Regular Reducer

const messagesReducer = (state = { all: {}, user: {} }, action) => {
    switch(action.type) {
      case RECEIVE_CHAT_MESSAGES:
        return { ...state, all: action.chatMessages };

      case RECEIVE_MESSAGE:
        state.all.push(action.message)
        return { ...state };

      default:
        return state;
    }
  };
  
export default messagesReducer;