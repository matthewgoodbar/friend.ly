import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';


import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import ChatBox from './components/ChatBox/ChatBox';
import MessagesPage from './components/MessagesPage/MessagesPage';
import GeoLocation from './components/GeoLocation/GeoLocation'

import { getCurrentUser } from './store/session';
import YelpDataItems from './components/YelpFetchData/YelpDataItems';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <ProtectedRoute path="/chatbox" component={ChatBox} />
        <ProtectedRoute path="/messages-page" component={MessagesPage} />
        <ProtectedRoute path="/geo-location" component={GeoLocation} />
      </Switch>
    </>
  );
}

export default App;