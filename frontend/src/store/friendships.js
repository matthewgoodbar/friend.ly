import { fetchUserChatrooms } from "./chats";
import jwtFetch from './jwt';
import { getCurrentUser } from "./session";




export const createFriendship = (data, socket) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/users/request/${data.contactId}`, {
            method: 'POST'
        });
        if (res.ok) {
            socket.emit("force chatrooms", { userId: data.userId, contactId: data.contactId })
            dispatch(getCurrentUser())
        } else {
            console.log("error in createFriendship response")
        }
    } catch (err) {
        console.log("error in createFriendship")
    }
};

export const destroyFriendship = (data, socket) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/users/request/${data.contactId}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            socket.emit("force chatrooms", { userId: data.userId, contactId: data.contactId})
            dispatch(getCurrentUser())
        } else {
            console.log("error in destroyFriendship response")
        }
    } catch (err) {
        console.log("error in destroyFriendship")
    }
};
