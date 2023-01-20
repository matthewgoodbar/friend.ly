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

export const removeUserTopic = (topicId) =>({
    type: REMOVE_USER_TOPIC,
    payload: topicId
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



export const createUserTopic =(userId,topic) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/topics/user/${userId}`, {
            method: 'POST',
            body: JSON.stringify(topic)
        });
        const data = await res.json();
        dispatch(addUserTopic(data));
    } catch(err) {
        console.log("error in createUserTopic")
}
}

export const deleteUserTopic =(userId, topicId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/topics/user/${userId}`, {
            method: 'DELETE'
        })
        dispatch(removeUserTopic(topicId))
    }catch(err) {
        console.log("error in deleteUserTopic")

    }
}



//store selector
export const getTopics = (state) => {
    if(state && state.topics){
        return Object.values(state.topics.all)
    }
}

export const getUserTopics = (state) => {
    if(state && state.topics){
        return Object.values(state.topics.userTopics)
    }
}

// reducer

// helper function


const removeObjectWithId =(arr, id) => {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    if (objWithIdIndex > -1) {
        arr.splice(objWithIdIndex, 1);
    }

    return arr;
}

const topicsReducer = (state={all:[], userTopics:[]}, action) => {
    const newState = {...state};
    switch(action.type) {
        case RECEIVE_ALL_TOPICS:
            return {...state, all:action.payload}
        case RECEIVE_USER_TOPICS:
            return {...state,userTopics:action.payload}
        case ADD_USER_TOPIC:
            newState.userTopics.push(action.payload)
            return newState
        case REMOVE_USER_TOPIC:
            const arr = removeObjectWithId(newState.userTopics, action.payload) 
            return {...state, userTopics: arr}
        default:
                return state;
    }
}

export default topicsReducer