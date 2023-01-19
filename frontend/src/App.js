import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import ChatBox from './components/ChatBox/ChatBox';
import MessagesPage from './components/MessagesPage/MessagesPage'

import { getCurrentUser } from './store/session';
import InterestPage from './components/InterestPage';
import YelpDataItems from './components/YelpFetchData/YelpDataItems';
import SingleInterest from './components/InterestPage/SingleInterest';

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
        <Route path='/interests' component={InterestPage} />
        <ProtectedRoute path="/messages-page" component={MessagesPage} />
        <Route path='/single' component={SingleInterest} />
      </Switch>
    </>
  );
}

export default App;