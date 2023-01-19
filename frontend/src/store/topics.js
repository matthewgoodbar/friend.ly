import jwtFetch from './jwt';

const RECEIVE_USER_TOPICS ='receive_user_topics'

export const receiveUserTopics = (topics) => ({
    type: RECEIVE_USER_TOPICS,
    payload: topics
})



//thunk action

export const fetchUserTopics = (userId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/topics/user/${userId}`);
        const topics = await res.json();
        console.log(res)
        dispatch(receiveUserTopics(topics));
    } catch (err) {
        console.log("error in fetchUserTopics")
        // const resBody = await err.json();
        // if (resBody.statusCode === 400) {
        //     dispatch(receiveErrors(resBody.errors));
        // }
    }
};


// reducer
const topicsReducer = (state={}, action) => {
    switch(action.type) {
        case RECEIVE_USER_TOPICS:
            console.log(action.payload)
            return {...action.payload}
        default:
                return state;
    }
}

export default topicsReducer