import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import {Link} from "react-router-dom";

import { login, clearSessionErrors } from '../../store/session';
import { useHistory } from 'react-router-dom';
import { fetchUserChatrooms } from '../../store/chats';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const history = useHistory();

  const chats = useSelector(state=>state.chats.daily)
  
  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })).then((res)=>{
      dispatch(fetchUserChatrooms(res.currentUser._id)).then((chatrooms)=>{
        if(!chatrooms.daily){
          history.push('/interests')
        }
      })
    })
  }

  const demoLoginV1 = (e) => {
    e.preventDefault();
    dispatch(login({ email:"demo-user-1@friend.ly", password:"password" })); 
  }

  const demoLoginV2 = (e) => {
    e.preventDefault();
    dispatch(login({ email:"demo-user-2@friend.ly", password:"password" }))
  }

  return (
    <section className='session'>

    <div className='session-left-side'>

      <div id='login-welcome'>
          <svg id='logo' width="151" height="57" viewBox="0 0 151 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.9531 19.5C17.6094 18.1875 18.2656 16.8906 18.9219 15.6094C19.5781 14.2969 20.1719 13.0781 20.7031 11.9531C21.2344 10.8281 21.6875 9.82812 22.0625 8.95312C22.4375 8.04688 22.6562 7.32812 22.7188 6.79688C22.7812 6.23438 22.7344 5.75 22.5781 5.34375C22.4219 4.9375 22.1562 4.60938 21.7812 4.35938C21.4375 4.10938 21.0156 3.92188 20.5156 3.79688C20.0469 3.64062 19.5156 3.54688 18.9219 3.51562C17.8906 3.45312 16.6562 3.48438 15.2188 3.60938C13.8125 3.70312 12.4531 3.90625 11.1406 4.21875C9.82812 4.5 8.6875 4.90625 7.71875 5.4375C6.78125 5.96875 6.28125 6.625 6.21875 7.40625C6.1875 7.84375 6.26562 8.23438 6.45312 8.57812C6.60938 8.85938 6.89062 9.125 7.29688 9.375C7.73438 9.625 8.375 9.71875 9.21875 9.65625C9.375 9.65625 9.5625 9.64062 9.78125 9.60938C9.96875 9.57812 10.2031 9.54688 10.4844 9.51562C10.7656 9.45312 11.0938 9.375 11.4688 9.28125L9.17188 12.375C8.73438 13 8.26562 13.375 7.76562 13.5C7.26562 13.625 6.8125 13.6562 6.40625 13.5938C6.1875 13.5625 5.75 13.4531 5.09375 13.2656C4.46875 13.0781 3.82812 12.7969 3.17188 12.4219C2.54688 12.0469 2 11.5469 1.53125 10.9219C1.0625 10.2656 0.875 9.45312 0.96875 8.48438C1.09375 7.35938 1.57812 6.32812 2.42188 5.39062C3.26562 4.42188 4.4375 3.59375 5.9375 2.90625C7.46875 2.21875 9.28125 1.6875 11.375 1.3125C13.5 0.9375 15.8906 0.75 18.5469 0.75C20.5469 0.75 22.1406 0.96875 23.3281 1.40625C24.5156 1.8125 25.375 2.35938 25.9062 3.04688C26.4688 3.70312 26.7344 4.48438 26.7031 5.39062C26.7031 6.26562 26.5156 7.17188 26.1406 8.10938C25.9531 8.54688 25.6719 9.15625 25.2969 9.9375C24.9531 10.6875 24.5312 11.5781 24.0312 12.6094C23.5312 13.6094 23 14.7188 22.4375 15.9375C21.875 17.1562 21.3125 18.4219 20.75 19.7344C21.5938 19.7969 22.3594 19.875 23.0469 19.9688C23.7656 20.0625 24.3281 20.1406 24.7344 20.2031C25.2031 20.3281 25.3594 20.5312 25.2031 20.8125C24.9219 21.375 24.6406 21.7969 24.3594 22.0781C24.1094 22.3594 23.8281 22.5625 23.5156 22.6875C23.2031 22.7812 22.8594 22.8281 22.4844 22.8281C22.1094 22.7969 21.6875 22.7656 21.2188 22.7344C20.9375 22.7344 20.6562 22.7344 20.375 22.7344C20.0938 22.7031 19.7969 22.6719 19.4844 22.6406C18.8906 24.0469 18.3125 25.4375 17.75 26.8125C17.2188 28.1875 16.7188 29.5 16.25 30.75C15.8125 31.9688 15.4219 33.0938 15.0781 34.125C14.7344 35.1562 14.5 36.0156 14.375 36.7031C14.1875 37.6719 14.0469 38.5781 13.9531 39.4219C13.8906 40.1406 13.8594 40.8906 13.8594 41.6719C13.8594 42.4531 13.9844 43.0781 14.2344 43.5469C13.5781 43.7344 13 43.8906 12.5 44.0156C12.0312 44.1406 11.625 44.2344 11.2812 44.2969C10.9062 44.3906 10.5938 44.4688 10.3438 44.5312C9.46875 44.75 8.84375 44.7188 8.46875 44.4375C8.125 44.1875 8.03125 43.5625 8.1875 42.5625C8.25 41.875 8.34375 41.0938 8.46875 40.2188C8.625 39.375 8.84375 38.4062 9.125 37.3125C9.4375 36.25 9.82812 35.0625 10.2969 33.75C10.7969 32.4062 11.4219 30.9219 12.1719 29.2969C12.6094 28.3594 13.1094 27.3281 13.6719 26.2031C14.2344 25.0469 14.8281 23.8125 15.4531 22.5C14.0781 22.5 12.5938 22.5938 11 22.7812C10.125 22.9062 9.26562 23.0469 8.42188 23.2031C7.70312 23.3594 6.92188 23.5469 6.07812 23.7656C5.26562 23.9531 4.5 24.1719 3.78125 24.4219C3.6875 24.1719 3.625 23.9219 3.59375 23.6719C3.59375 23.4219 3.60938 23.1875 3.64062 22.9688C3.67188 22.75 3.71875 22.5312 3.78125 22.3125C3.84375 22.0938 3.9375 21.875 4.0625 21.6562C4.25 21.2812 4.54688 20.8125 4.95312 20.25C6.42188 20.0625 7.82812 19.9219 9.17188 19.8281C10.5156 19.7344 11.7031 19.6562 12.7344 19.5938C13.9531 19.5312 15.0938 19.5 16.1562 19.5C16.3125 19.4688 16.4375 19.4688 16.5312 19.5C16.6562 19.5 16.7969 19.5 16.9531 19.5Z" fill="#333333"/>
      <path d="M25.3438 35.7656C25.125 36.1094 24.8906 36.3281 24.6406 36.4219C24.3594 36.5469 24.125 36.5625 23.9375 36.4688C23.7188 36.4062 23.5781 36.25 23.5156 36C23.4531 35.75 23.5156 35.4375 23.7031 35.0625C23.7969 34.875 24.0156 34.4531 24.3594 33.7969C24.6719 33.1406 25.0625 32.3594 25.5312 31.4531C25.9688 30.5156 26.4531 29.5156 26.9844 28.4531C27.5156 27.3594 28.0156 26.3281 28.4844 25.3594C28.9844 24.3906 29.4375 23.5312 29.8438 22.7812C30.25 22 30.5469 21.4375 30.7344 21.0938C30.3906 20.7812 30.1562 20.5625 30.0312 20.4375C29.9062 20.2812 29.8125 19.9688 29.75 19.5C29.6875 19.0938 29.7812 18.5625 30.0312 17.9062C30.2812 17.25 30.6094 16.625 31.0156 16.0312C31.4219 15.4062 31.875 14.875 32.375 14.4375C32.875 14 33.3594 13.7812 33.8281 13.7812C34.7031 13.7812 35.3125 14.0625 35.6562 14.625C36.0312 15.1875 36.25 15.7656 36.3125 16.3594C36.375 16.7656 36.3438 17.2812 36.2188 17.9062C36.0938 18.5312 35.8594 19.0938 35.5156 19.5938C35.6094 19.6562 35.7344 19.7344 35.8906 19.8281C36.0469 19.8906 36.2969 19.9219 36.6406 19.9219C37.1406 19.9219 37.4844 19.8906 37.6719 19.8281C37.8906 19.7656 38.2188 19.7344 38.6562 19.7344C39.1875 19.7344 39.625 19.875 39.9688 20.1562C40.3125 20.4062 40.5938 20.7344 40.8125 21.1406C41.0312 21.5156 41.1875 21.9375 41.2812 22.4062C41.4062 22.8438 41.4844 23.25 41.5156 23.625C41.6094 24.4062 41.4062 25.2188 40.9062 26.0625C40.4062 26.9062 39.7969 27.8281 39.0781 28.8281C38.6406 29.4531 38.2031 30.1562 37.7656 30.9375C37.3281 31.7188 37.1406 32.4219 37.2031 33.0469C37.2656 33.4531 37.375 33.7812 37.5312 34.0312C37.6875 34.2812 38.125 34.4062 38.8438 34.4062C39.375 34.4062 39.9531 34.2188 40.5781 33.8438C41.2344 33.4375 41.8906 32.9375 42.5469 32.3438C43.2344 31.7188 43.9062 31.0469 44.5625 30.3281C45.2188 29.5781 45.8281 28.8594 46.3906 28.1719C46.9531 27.4531 47.4219 26.8125 47.7969 26.25C48.2031 25.6875 48.5 25.2812 48.6875 25.0312C48.8438 24.7812 49.0469 24.6094 49.2969 24.5156C49.5469 24.4219 49.7656 24.4219 49.9531 24.5156C50.1406 24.6094 50.25 24.7969 50.2812 25.0781C50.3438 25.3594 50.2344 25.7344 49.9531 26.2031C49.7656 26.5156 49.4375 27.0156 48.9688 27.7031C48.5312 28.3906 47.9844 29.1562 47.3281 30C46.7031 30.8438 46 31.7188 45.2188 32.625C44.4375 33.5 43.6094 34.3125 42.7344 35.0625C41.8906 35.7812 41.0312 36.375 40.1562 36.8438C39.3125 37.3125 38.5 37.5469 37.7188 37.5469C36.9062 37.5469 36.2344 37.3906 35.7031 37.0781C35.1719 36.7656 34.7344 36.3906 34.3906 35.9531C34.0781 35.4844 33.8438 34.9844 33.6875 34.4531C33.5625 33.8906 33.5156 33.375 33.5469 32.9062C33.5781 32.5312 33.6719 32.1406 33.8281 31.7344C34.0156 31.2969 34.2188 30.8594 34.4375 30.4219C34.6875 29.9531 34.9375 29.5 35.1875 29.0625C35.4688 28.5938 35.7188 28.1406 35.9375 27.7031C36.4688 26.7969 36.8906 26.0312 37.2031 25.4062C37.5469 24.75 37.7188 24.2031 37.7188 23.7656C37.7188 23.4844 37.6562 23.2344 37.5312 23.0156C37.4062 22.7969 37.2031 22.6875 36.9219 22.6875C36.7344 22.6875 36.5938 22.7031 36.5 22.7344C36.4375 22.7344 36.3594 22.7344 36.2656 22.7344C36.2031 22.7344 36.0938 22.75 35.9375 22.7812C35.8125 22.7812 35.6094 22.7812 35.3281 22.7812C34.9219 22.7812 34.5781 22.7188 34.2969 22.5938C34.0156 22.4688 33.75 22.375 33.5 22.3125C33.375 22.5312 33.0938 23 32.6562 23.7188C32.2188 24.4375 31.7031 25.2812 31.1094 26.25C30.5469 27.2188 29.9375 28.2344 29.2812 29.2969C28.6562 30.3594 28.0625 31.3594 27.5 32.2969C26.9375 33.2031 26.4688 33.9844 26.0938 34.6406C25.6875 35.2656 25.4375 35.6406 25.3438 35.7656Z" fill="#333333"/>
      <path d="M56.9375 8.39062C56.8438 8.73438 56.6562 9.07812 56.375 9.42188C56.125 9.73438 55.8281 10 55.4844 10.2188C55.1719 10.4062 54.8438 10.5312 54.5 10.5938C54.1562 10.6562 53.875 10.5938 53.6562 10.4062C53 9.90625 52.6562 9.375 52.625 8.8125C52.5938 8.21875 52.7344 7.67188 53.0469 7.17188C53.3594 6.64062 53.75 6.20312 54.2188 5.85938C54.6875 5.48438 55.0938 5.26562 55.4375 5.20312C55.7812 5.14062 56.0625 5.21875 56.2812 5.4375C56.5312 5.625 56.7188 5.89062 56.8438 6.23438C56.9688 6.54688 57.0312 6.90625 57.0312 7.3125C57.0625 7.71875 57.0312 8.07812 56.9375 8.39062ZM50.4688 18.375C50.625 18.1875 50.9219 18.0312 51.3594 17.9062C51.7969 17.7812 52.25 17.6875 52.7188 17.625C53.1875 17.5312 53.6094 17.4844 53.9844 17.4844C54.3906 17.4531 54.625 17.4531 54.6875 17.4844C54.7188 17.5156 54.6406 17.8438 54.4531 18.4688C54.2656 19.0938 54.0312 19.8281 53.75 20.6719C53.4688 21.5156 53.1719 22.3906 52.8594 23.2969C52.5469 24.1719 52.3125 24.8906 52.1562 25.4531C52 26.0156 51.8125 26.6562 51.5938 27.375C51.375 28.0625 51.1719 28.75 50.9844 29.4375C50.8281 30.0938 50.7188 30.7188 50.6562 31.3125C50.5938 31.9062 50.6406 32.3594 50.7969 32.6719C50.9531 33.0469 51.125 33.3125 51.3125 33.4688C51.5 33.5938 51.7031 33.6562 51.9219 33.6562C52.5469 33.6562 53.3281 33.3125 54.2656 32.625C55.2344 31.9375 56.2031 31.125 57.1719 30.1875C58.1719 29.2188 59.0938 28.25 59.9375 27.2812C60.7812 26.2812 61.4062 25.4844 61.8125 24.8906C62.0625 24.5781 62.3125 24.375 62.5625 24.2812C62.8438 24.1875 63.0625 24.2031 63.2188 24.3281C63.4062 24.4531 63.5 24.6562 63.5 24.9375C63.5312 25.2188 63.4375 25.5469 63.2188 25.9219C62.7188 26.7969 61.9844 27.8438 61.0156 29.0625C60.0469 30.25 59.0156 31.4062 57.9219 32.5312C56.8281 33.625 55.75 34.5625 54.6875 35.3438C53.6562 36.125 52.8125 36.5312 52.1562 36.5625C51.625 36.5938 51.0938 36.5 50.5625 36.2812C50.0625 36.0938 49.5938 35.8281 49.1562 35.4844C48.75 35.1094 48.4062 34.6875 48.125 34.2188C47.8438 33.7188 47.6875 33.2031 47.6562 32.6719C47.5625 31.8906 47.5625 30.8281 47.6562 29.4844C47.75 28.1094 47.9219 26.7188 48.1719 25.3125C48.4219 23.875 48.7344 22.5156 49.1094 21.2344C49.5156 19.9531 49.9688 19 50.4688 18.375Z" fill="#333333"/>
      <path d="M81.0312 26.25C80.0938 27.625 79.0312 28.9688 77.8438 30.2812C76.6562 31.5625 75.3906 32.7188 74.0469 33.75C72.7344 34.75 71.375 35.5625 69.9688 36.1875C68.5938 36.8125 67.25 37.125 65.9375 37.125C65.25 37.125 64.5 36.9531 63.6875 36.6094C62.9062 36.2969 62.1875 35.7969 61.5312 35.1094C60.875 34.4219 60.3438 33.5312 59.9375 32.4375C59.5625 31.3438 59.4531 30.0156 59.6094 28.4531C59.7344 27.1719 60.125 25.8281 60.7812 24.4219C61.4688 22.9844 62.2969 21.6719 63.2656 20.4844C64.2656 19.2969 65.375 18.3125 66.5938 17.5312C67.8438 16.75 69.0938 16.3594 70.3438 16.3594C71.5312 16.3594 72.3906 16.6562 72.9219 17.25C73.4531 17.8438 73.6875 18.5781 73.625 19.4531C73.5312 20.4219 73.25 21.3125 72.7812 22.125C72.3438 22.9375 71.8125 23.6719 71.1875 24.3281C70.5625 24.9844 69.8906 25.5781 69.1719 26.1094C68.4844 26.6406 67.8281 27.125 67.2031 27.5625C66.5156 28.0312 65.8594 28.4844 65.2344 28.9219C64.6094 29.3281 64.0625 29.7031 63.5938 30.0469C63.625 30.8281 63.7656 31.4844 64.0156 32.0156C64.2656 32.5469 64.5781 32.9844 64.9531 33.3281C65.3281 33.6406 65.75 33.875 66.2188 34.0312C66.7188 34.1562 67.2188 34.2188 67.7188 34.2188C68.7812 34.2188 69.8906 33.8906 71.0469 33.2344C72.2031 32.5469 73.3281 31.7344 74.4219 30.7969C75.5469 29.8281 76.5781 28.8281 77.5156 27.7969C78.4844 26.7656 79.2812 25.875 79.9062 25.125C80.125 24.875 80.3438 24.7344 80.5625 24.7031C80.8125 24.6406 81 24.6719 81.125 24.7969C81.2812 24.8906 81.3594 25.0781 81.3594 25.3594C81.3594 25.6094 81.25 25.9062 81.0312 26.25ZM69.0312 19.0312C68.6562 19.0312 68.2031 19.2188 67.6719 19.5938C67.1719 19.9688 66.6719 20.5156 66.1719 21.2344C65.6719 21.9219 65.2031 22.7812 64.7656 23.8125C64.3281 24.8125 64 25.9688 63.7812 27.2812C64.1562 27 64.5625 26.7188 65 26.4375C65.4375 26.125 65.875 25.7969 66.3125 25.4531C67.6562 24.4219 68.5938 23.5156 69.125 22.7344C69.6562 21.9531 69.9531 21.2812 70.0156 20.7188C70.0781 20.125 70.0156 19.7031 69.8281 19.4531C69.6406 19.1719 69.375 19.0312 69.0312 19.0312Z" fill="#333333"/>
      <path d="M91.5781 37.1719C90.8594 37.1719 90.2344 37.0312 89.7031 36.75C89.2031 36.5 88.7969 36.1562 88.4844 35.7188C88.1719 35.2812 87.9688 34.7812 87.875 34.2188C87.7812 33.625 87.8125 33 87.9688 32.3438C88.0625 31.9062 88.2188 31.3281 88.4375 30.6094C88.6562 29.8594 88.875 29.0625 89.0938 28.2188C89.3438 27.3438 89.5625 26.4844 89.75 25.6406C89.9688 24.7656 90.1094 23.9844 90.1719 23.2969C90.2344 22.5781 90.2031 22 90.0781 21.5625C89.9531 21.0938 89.6875 20.8594 89.2812 20.8594C88.7812 20.8594 88.2656 21.0312 87.7344 21.375C87.2031 21.6875 86.6562 22.125 86.0938 22.6875C85.5625 23.25 85.0156 23.9062 84.4531 24.6562C83.9219 25.375 83.3906 26.125 82.8594 26.9062C82.5781 27.9688 82.3438 28.9062 82.1562 29.7188C81.9688 30.5 81.7969 31.2188 81.6406 31.875C81.5156 32.5 81.3906 33.0625 81.2656 33.5625C81.1406 34.0312 81.0312 34.4844 80.9375 34.9219C80.8438 35.2344 80.5625 35.5469 80.0938 35.8594C79.625 36.1406 79.125 36.375 78.5938 36.5625C78.0625 36.75 77.6094 36.8438 77.2344 36.8438C76.8281 36.8438 76.6562 36.7031 76.7188 36.4219C76.75 36.2344 76.8594 35.8125 77.0469 35.1562C77.2031 34.5 77.4062 33.7344 77.6562 32.8594C77.875 31.9531 78.1094 31 78.3594 30C78.6094 29 78.8438 28.0469 79.0625 27.1406C79.2188 26.4219 79.3906 25.625 79.5781 24.75C79.7344 24 79.9219 23.125 80.1406 22.125C80.3906 21.125 80.6719 20.0312 80.9844 18.8438C81.2031 18.6562 81.4219 18.5156 81.6406 18.4219C81.8906 18.2969 82.1406 18.2031 82.3906 18.1406C82.6406 18.0469 82.9062 17.9844 83.1875 17.9531C83.4375 17.9531 83.6875 17.9688 83.9375 18C84.1562 18.0312 84.375 18.0938 84.5938 18.1875C84.8438 18.25 85.0625 18.3594 85.25 18.5156C85.1562 18.7344 85.0469 19.0469 84.9219 19.4531C84.7969 19.8281 84.6719 20.2344 84.5469 20.6719C84.4219 21.1719 84.2656 21.6875 84.0781 22.2188C84.4844 21.6562 84.9375 21.0938 85.4375 20.5312C85.9688 19.9375 86.5312 19.4062 87.125 18.9375C87.75 18.4688 88.4062 18.0938 89.0938 17.8125C89.7812 17.5 90.4844 17.3438 91.2031 17.3438C91.7969 17.3438 92.3281 17.5156 92.7969 17.8594C93.2656 18.2031 93.625 18.6875 93.875 19.3125C94.1562 19.9062 94.3125 20.625 94.3438 21.4688C94.4062 22.3125 94.2969 23.2344 94.0156 24.2344L93.5 26.2969C93.3438 26.9531 93.1406 27.7344 92.8906 28.6406C92.6719 29.5156 92.3906 30.4844 92.0469 31.5469C91.8594 32.2344 91.7812 32.8281 91.8125 33.3281C91.875 33.8281 92.1875 34.0781 92.75 34.0781C93.3125 34.0781 94.0156 33.7344 94.8594 33.0469C95.7344 32.3594 96.6094 31.5312 97.4844 30.5625C98.3594 29.5938 99.1875 28.6094 99.9688 27.6094C100.75 26.5781 101.344 25.75 101.75 25.125C102.031 24.7188 102.297 24.4531 102.547 24.3281C102.797 24.2031 102.984 24.1875 103.109 24.2812C103.266 24.375 103.344 24.5938 103.344 24.9375C103.344 25.25 103.219 25.6562 102.969 26.1562C102.75 26.5938 102.406 27.1719 101.938 27.8906C101.5 28.6094 100.969 29.375 100.344 30.1875C99.7188 31 99.0469 31.8281 98.3281 32.6719C97.6094 33.4844 96.8594 34.2344 96.0781 34.9219C95.2969 35.5781 94.5156 36.1094 93.7344 36.5156C92.9844 36.9531 92.2656 37.1719 91.5781 37.1719Z" fill="#333333"/>
      <path d="M114.734 27.0469C114.578 28.0156 114.422 28.9375 114.266 29.8125C114.141 30.6875 114.062 31.3906 114.031 31.9219C114 32.7031 114.141 33.2656 114.453 33.6094C114.766 33.9531 115.109 34.125 115.484 34.125C115.922 34.125 116.453 33.9062 117.078 33.4688C117.734 33.0312 118.422 32.4844 119.141 31.8281C119.859 31.1719 120.578 30.4531 121.297 29.6719C122.016 28.8906 122.672 28.1562 123.266 27.4688C123.891 26.75 124.406 26.125 124.812 25.5938C125.25 25.0625 125.547 24.7188 125.703 24.5625C125.891 24.375 126.078 24.2656 126.266 24.2344C126.484 24.2031 126.656 24.2344 126.781 24.3281C126.906 24.4219 126.969 24.5938 126.969 24.8438C126.969 25.0938 126.844 25.4062 126.594 25.7812C126.219 26.375 125.734 27.0781 125.141 27.8906C124.547 28.6719 123.891 29.4844 123.172 30.3281C122.453 31.1719 121.688 32 120.875 32.8125C120.094 33.625 119.297 34.3438 118.484 34.9688C117.703 35.5938 116.938 36.0938 116.188 36.4688C115.469 36.875 114.812 37.0781 114.219 37.0781C113.781 37.0781 113.359 36.9531 112.953 36.7031C112.578 36.4531 112.234 36.125 111.922 35.7188C111.609 35.3125 111.359 34.8594 111.172 34.3594C111.016 33.8594 110.953 33.3594 110.984 32.8594C111.016 32.6406 111.062 32.2656 111.125 31.7344C109.812 33.2031 108.484 34.375 107.141 35.25C105.828 36.0938 104.562 36.5156 103.344 36.5156C102.906 36.5156 102.438 36.4062 101.938 36.1875C101.438 35.9688 100.984 35.6094 100.578 35.1094C100.203 34.6094 99.8906 33.9531 99.6406 33.1406C99.3906 32.3281 99.2969 31.3438 99.3594 30.1875C99.4531 28.375 99.8125 26.6562 100.438 25.0312C101.062 23.4062 101.844 22 102.781 20.8125C103.75 19.5938 104.828 18.6406 106.016 17.9531C107.234 17.2344 108.453 16.875 109.672 16.875C110.203 16.875 110.688 17.0156 111.125 17.2969C111.562 17.5469 111.938 17.8906 112.25 18.3281C112.562 18.7344 112.812 19.1875 113 19.6875C113.219 20.1875 113.375 20.6562 113.469 21.0938C113.688 20.1875 113.891 19.2969 114.078 18.4219C114.266 17.5469 114.453 16.7188 114.641 15.9375C114.953 14.7812 115.281 13.5312 115.625 12.1875C115.938 11.0312 116.297 9.70312 116.703 8.20312C117.109 6.70312 117.562 5.125 118.062 3.46875C118.375 3.21875 118.672 3.03125 118.953 2.90625C119.234 2.78125 119.5 2.6875 119.75 2.625C120.031 2.53125 120.297 2.48438 120.547 2.48438C120.859 2.48438 121.141 2.53125 121.391 2.625C121.641 2.6875 121.844 2.89062 122 3.23438C122.188 3.54688 122.312 4.03125 122.375 4.6875C122.438 5.34375 122.438 6.23438 122.375 7.35938C122.312 8.73438 122.062 10.2344 121.625 11.8594C121.219 13.4844 120.672 15.1719 119.984 16.9219C119.297 18.6406 118.5 20.375 117.594 22.125C116.719 23.8438 115.766 25.4844 114.734 27.0469ZM111.969 27.6562C112.094 27.0625 112.203 26.4688 112.297 25.875C112.422 25.2812 112.562 24.6719 112.719 24.0469C112.656 24.0781 112.594 24.1094 112.531 24.1406C112.5 24.1719 112.453 24.2031 112.391 24.2344C112.047 24.3906 111.812 24.3906 111.688 24.2344C111.562 24.0469 111.5 23.7656 111.5 23.3906C111.5 23.2031 111.484 22.875 111.453 22.4062C111.422 21.9062 111.328 21.4062 111.172 20.9062C111.047 20.375 110.844 19.9219 110.562 19.5469C110.281 19.1406 109.891 18.9375 109.391 18.9375C108.672 18.9375 107.938 19.3125 107.188 20.0625C106.438 20.7812 105.734 21.6719 105.078 22.7344C104.422 23.7656 103.875 24.875 103.438 26.0625C103 27.25 102.75 28.3125 102.688 29.25C102.625 30.75 102.812 31.8281 103.25 32.4844C103.688 33.1406 104.281 33.4688 105.031 33.4688C105.594 33.4688 106.203 33.25 106.859 32.8125C107.547 32.375 108.203 31.8438 108.828 31.2188C109.484 30.5938 110.078 29.9531 110.609 29.2969C111.172 28.6406 111.625 28.0938 111.969 27.6562Z" fill="#333333"/>
      <path d="M122.328 35.25C123.703 29.4688 124.797 24.8281 125.609 21.3281C126.453 17.8281 127.094 15.1562 127.531 13.3125C128.031 11.125 128.375 9.60938 128.562 8.76562C128.656 8.17188 128.734 7.59375 128.797 7.03125C128.859 6.53125 128.891 6.01562 128.891 5.48438C128.891 4.95312 128.844 4.46875 128.75 4.03125C129 3.875 129.266 3.75 129.547 3.65625C129.859 3.5625 130.156 3.48438 130.438 3.42188C130.781 3.32812 131.125 3.25 131.469 3.1875C131.812 3.125 132.125 3.09375 132.406 3.09375C132.656 3.09375 132.891 3.125 133.109 3.1875C133.328 3.21875 133.469 3.3125 133.531 3.46875C133.719 3.625 133.797 3.9375 133.766 4.40625C133.766 4.875 133.734 5.35938 133.672 5.85938C133.547 6.45312 133.406 7.09375 133.25 7.78125C132.875 9.125 132.359 11.0625 131.703 13.5938C131.141 15.75 130.375 18.6875 129.406 22.4062C128.469 26.125 127.281 30.8125 125.844 36.4688C125.688 36.625 125.5 36.7344 125.281 36.7969C125.062 36.8594 124.859 36.8906 124.672 36.8906C124.453 36.8906 124.219 36.875 123.969 36.8438C123.75 36.7812 123.531 36.6875 123.312 36.5625C123.125 36.4375 122.938 36.2656 122.75 36.0469C122.562 35.8594 122.422 35.5938 122.328 35.25Z" fill="#333333"/>
      <path d="M145.859 18.75C146.266 18.4375 146.656 18.2031 147.031 18.0469C147.438 17.8594 147.797 17.7344 148.109 17.6719C148.453 17.5781 148.797 17.5469 149.141 17.5781C149.984 17.6406 150.5 17.9062 150.688 18.375C150.906 18.8438 150.938 19.5938 150.781 20.625C150.688 21.1562 150.5 21.8281 150.219 22.6406C149.938 23.4531 149.609 24.4531 149.234 25.6406C148.859 26.7969 148.453 28.125 148.016 29.625C147.609 31.125 147.219 32.8125 146.844 34.6875C146.469 36.2188 146.062 37.9844 145.625 39.9844C145.25 41.7344 144.797 43.8438 144.266 46.3125C143.766 48.7812 143.219 51.6094 142.625 54.7969C142.469 55.5781 142.125 56.0312 141.594 56.1562C141.094 56.2812 140.562 56.2188 140 55.9688C139.781 55.8438 139.578 55.7031 139.391 55.5469C139.234 55.3906 139.062 55.2031 138.875 54.9844C138.688 54.7969 138.531 54.5312 138.406 54.1875C139.125 51.5625 139.75 49.1719 140.281 47.0156C140.844 44.8594 141.344 42.9844 141.781 41.3906C142.25 39.5469 142.688 37.8906 143.094 36.4219C143.25 35.7656 143.391 35.125 143.516 34.5C143.672 33.8438 143.828 33.2031 143.984 32.5781C143.578 33.2344 143.141 33.8594 142.672 34.4531C142.203 35.0469 141.688 35.5625 141.125 36C140.562 36.4375 139.953 36.7656 139.297 36.9844C138.672 37.2344 138.016 37.3125 137.328 37.2188C135.641 37 134.438 36.375 133.719 35.3438C133.031 34.3125 132.734 32.9688 132.828 31.3125C132.859 30.6562 132.953 29.9375 133.109 29.1562C133.266 28.375 133.438 27.625 133.625 26.9062C133.812 26.1875 133.984 25.5469 134.141 24.9844C134.328 24.3906 134.469 23.9688 134.562 23.7188C134.938 22.5312 135.203 21.5156 135.359 20.6719C135.547 19.8281 135.422 19.125 134.984 18.5625C135.422 18.2812 135.828 18.0938 136.203 18C136.609 17.875 136.969 17.7812 137.281 17.7188C137.625 17.6875 137.969 17.6875 138.312 17.7188C139.156 17.8438 139.641 18.1562 139.766 18.6562C139.922 19.1562 139.875 19.9062 139.625 20.9062C139.5 21.4375 139.297 22.125 139.016 22.9688C138.734 23.7812 138.438 24.625 138.125 25.5C137.812 26.375 137.531 27.1875 137.281 27.9375C137.031 28.6562 136.891 29.1719 136.859 29.4844C136.578 30.8906 136.562 31.9844 136.812 32.7656C137.062 33.5156 137.609 33.8906 138.453 33.8906C138.859 33.8906 139.312 33.7188 139.812 33.375C140.312 33 140.812 32.5156 141.312 31.9219C141.844 31.3281 142.359 30.6562 142.859 29.9062C143.359 29.125 143.812 28.3438 144.219 27.5625C144.656 26.7812 145.031 26.0156 145.344 25.2656C145.688 24.5156 145.938 23.8438 146.094 23.25C146.312 22.0938 146.453 21.1875 146.516 20.5312C146.578 19.875 146.359 19.2812 145.859 18.75Z" fill="#333333"/>
          </svg>

          <h2>Hi, Welcome Back!</h2>
      </div>
      <form className="session-form" onSubmit={handleSubmit}>


        <div>

          <label>Email <br />
            <input type="text"
              value={email}
              onChange={update('email')}
              placeholder="Email"
            />
          </label>

          <div className="errors">{errors?.email}</div>
        </div>
        
        <div>
          <label>Password <br />
            <input type="password"
              value={password}
              onChange={update('password')}
              placeholder="Password"
            />
          </label>

          <div className="errors">{errors?.password}</div>
        </div>

        <input id="submit-btn"
          type="submit"
          value="LOG IN"
          // disabled={!email || !password}
        />

      </form>

      {/* <div id='demo-users-section'> */}
      <hr id='bottom-line-demo-users' />

        <div id='explore-app'>
          <p>Explore the App with these Demo User Accounts</p>
        </div>
        <button className="submit-btn-demo" onClick={demoLoginV1}>
          Demo User 1
        </button>

        <button className="submit-btn-demo" id='demo-user-v2' onClick={demoLoginV2}>
          Demo User 2
        </button>
      {/* </div> */}
        <hr id='bottom-line' />

        <div id='signup-offer'>
          <p>Don't have an account yet? <span><Link id="link-to-signup" to="/signup">Sign Up</Link></span></p>
        </div>

    </div>


    <div id='session-right-side'>
      <div>
        <h1>365 opportunities to make new friends</h1>
        <p>Meet new locals in your area every day. Talk about what you love, meet up, and make new friends.</p>
        <div className='rectangles'>
                <div id='big-rec'></div>
                <div id='small-rec'></div>
                <div id='topic-rec'></div>
        </div>
      </div>
    </div>

  </section>
  );
}

export default LoginForm;