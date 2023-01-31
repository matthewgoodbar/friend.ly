import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_CHAT_MESSAGES = "RECEIVE_CHAT_MESSAGES";
const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
const RECEIVE_EDITED_MESSAGE = "RECEIVE_EDITED_MESSAGE"
const DELETE_MESSAGE = "DELETE_MESSAGE"

//Actions

const receiveChatMessages = chatMessages => ({
  type: RECEIVE_CHAT_MESSAGES,
  chatMessages
});

export const receiveNewMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});

export const receiveEditedMessage = message => ({
  type: RECEIVE_EDITED_MESSAGE,
  message
});

export const removeMessage = messageId => ({
  type: DELETE_MESSAGE,
  messageId
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

export const editMessage = (socket, activeChatRoom, data) => async dispatch => {
  try {
    const res = await jwtFetch(`/api/messages/${data._id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
    const message = await res.json();
    socket.emit("edit message", { message, activeChatRoom } );
  } catch (err) {
    console.log("error in editMessage")
    // const resBody = await err.json();
    // if (resBody.statusCode === 400) {
    //   return dispatch(receiveErrors(resBody.errors));
    // }
  }
};

export const deleteMessage = (socket, activeChatRoom, data) => async dispatch => {
  try {
    const res = await jwtFetch(`/api/messages/${data._id}`, {
      method: 'DELETE',
      body: JSON.stringify(data)
    });
    const messageId = await res.json();
    socket.emit("delete message", { messageId, activeChatRoom });
  } catch (err) {
    console.log("error in editMessage")
    // const resBody = await err.json();
    // if (resBody.statusCode === 400) {
    //   return dispatch(receiveErrors(resBody.errors));
    // }
  }
};

//Regular Reducer

const updateMessageInState = (newMessage, state) => {

  for (let i = 0; i < state.all.length; i++) {	
    let message = state.all[i]
    if (message._id === newMessage._id) {
      state.all[i] = newMessage
      break
    }
  }

  return { ...state }
}

const deleteMessageInState = (messageId, state) => {

  let delIndex;
  for (let i = 0; i < state.all.length; i++) {
    let message = state.all[i]
    if (message._id === messageId) {
      delIndex = i
      break
    }
  }
  state.all.splice(delIndex, 1)
  return { ...state }
}




const messagesReducer = (state = { all: {}, unread: {} }, action) => {
    switch(action.type) {
      case RECEIVE_CHAT_MESSAGES:
        return { ...state, all: action.chatMessages };

      case RECEIVE_MESSAGE:
        state.all.push(action.message)
        return { ...state };

      case RECEIVE_EDITED_MESSAGE:
        return updateMessageInState(action.message, state)

      case DELETE_MESSAGE:
        return deleteMessageInState(action.messageId, state)

      default:
        return state;
    }
  };
  
export default messagesReducer;