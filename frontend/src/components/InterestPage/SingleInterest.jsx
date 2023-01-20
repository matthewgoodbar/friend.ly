import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserTopic } from "../../store/topics";
import {fetchAllTopics, fetchUserTopics, getTopics, getUserTopics} from "../../store/topics.js";
import interestImg from './interest.png'

const SingleInterest =({interest}) => {
    const user = useSelector(state => state.session.user);
    const userTopics = useSelector(getUserTopics)
    const dispatch = useDispatch();
    const findObjectWithId =(arr, id) => {
        const objWithIdIndex = arr.findIndex((obj) => obj._id === id);
        if (objWithIdIndex > -1) {
            return true
        }
        return false
    }
    const find = findObjectWithId(userTopics, interest._id)
    const addInterest =(e) => {
        e.preventDefault();
        console.log(interest)
        if (!find) {
            dispatch(createUserTopic(user._id, interest))
        }
    }



    return(
        <a href="#" className="interest">
            <div className="thumbnail">
                <img src={interest.background_url||interestImg}alt="Hiking" />
            </div>
            <button onClick={addInterest}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 14C6.50417 14 6.08825 13.832 5.75225 13.496C5.41742 13.1612 5.25 12.7458 5.25 12.25V8.75H1.75C1.25417 8.75 0.838834 8.582 0.504 8.246C0.168 7.91117 0 7.49583 0 7C0 6.50417 0.168 6.08825 0.504 5.75225C0.838834 5.41742 1.25417 5.25 1.75 5.25H5.25V1.75C5.25 1.25417 5.41742 0.838249 5.75225 0.502249C6.08825 0.167416 6.50417 0 7 0C7.49583 0 7.91175 0.167416 8.24775 0.502249C8.58258 0.838249 8.75 1.25417 8.75 1.75V5.25H12.25C12.7458 5.25 13.1618 5.41742 13.4978 5.75225C13.8326 6.08825 14 6.50417 14 7C14 7.49583 13.8326 7.91117 13.4978 8.246C13.1618 8.582 12.7458 8.75 12.25 8.75H8.75V12.25C8.75 12.7458 8.58258 13.1612 8.24775 13.496C7.91175 13.832 7.49583 14 7 14Z" fill="currentColor"/>
                </svg>
            </button>
            <p>{interest.name}</p>
        </a>
    )
}

export default SingleInterest