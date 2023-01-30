import { fetchUserChatrooms } from "./chats";
import jwtFetch from './jwt';
import { getCurrentUser } from "./session";




export const createFriendship = (data, socket) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/users/request/${data.contactId}`, {
            method: 'POST'
        });
        if (res.ok) {
            console.log("in create friendship")
            socket.emit("force fetch chatrooms", data.contactId)
            dispatch(fetchUserChatrooms(data.userId));
            dispatch(getCurrentUser())
        } else {
            console.log("error in createFriendship response")
            console.log(res.message)
        }
    } catch (err) {
        console.log("error in createFriendship")
        // const resBody = await err.json();
        // if (resBody.statusCode === 400) {
        //   return dispatch(receiveErrors(resBody.errors));
        // }
    }
};

export const destroyFriendship = (data, socket) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/users/request/${data.contactId}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            console.log("in destroy friendship")
            socket.emit("force chatrooms", data.contactId)
            dispatch(fetchUserChatrooms(data.userId));
            dispatch(getCurrentUser())
        } else {
            console.log("error in destroyFriendship response")
        }
    } catch (err) {
        console.log(err)
        console.log("error in destroyFriendship")
        // const resBody = await err.json();
        // if (resBody.statusCode === 400) {
        //   return dispatch(receiveErrors(resBody.errors));
        // }
    }
};
