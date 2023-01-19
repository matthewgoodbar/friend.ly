import jwtFetch from './jwt';
const RECEIVE_ALL_TOPICS ='receive_all_topics'
const RECEIVE_USER_TOPICS ='receive_user_topics';
const ADD_USER_TOPIC ='add_user_topic';
const REMOVE_USER_TOPIC ='remove_user_topic'

export const receiveAllTopics =(topics) => ({
    type: RECEIVE_ALL_TOPICS,
    payload: topics
})

export const receiveUserTopics = (topics) => ({
    type: RECEIVE_USER_TOPICS,
    payload: topics
})

export const addUserTopic = (topic) => ({
    type: ADD_USER_TOPIC,
    payload: topic
})

export const removeUserTopic = (topic) =>({
    type: REMOVE_USER_TOPIC,
    payload: topic
})

//thunk action

export const fetchAllTopics = () => async(dispatch) => {
    try {
        const res = await jwtFetch('/api/topics/');
        const topics = await res.json();
        dispatch(receiveAllTopics(topics));
    } catch (err) {
        console.log("error in fetchUserTopics")
}}

export const fetchUserTopics = (userId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/topics/user/${userId}`);
        const topics = await res.json();
        dispatch(receiveUserTopics(topics));
    } catch (err) {
        console.log("error in fetchUserTopics")
    }
};



export const createUserTopic =(userId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/topics//user/${userId}`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const data = await res.json();
        dispatch(addUserTopic(data));
    } catch(err) {
        console.log("error in createUserTopic")
}
}
//store selector
export const getTopics = (state) => {
    if(state && state.topics){
        return Object.values(state.topics.all)
    }
}

// reducer
const topicsReducer = (state={all:[], userTopics:[]}, action) => {
    switch(action.type) {
        case RECEIVE_ALL_TOPICS:
            return {all:action.payload,userTopics:[]}
        case RECEIVE_USER_TOPICS:
            // console.log(action.payload)
            return {...state,userTopics:action.payload}
        case ADD_USER_TOPIC:
            const newState = {...state}
            console.log(newState)
            // newState[userTopics].push(action.payload)
            // return {...newState}
        default:
                return state;
    }
}

export default topicsReducer