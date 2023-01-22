import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';


import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';

import Welcome from './components/Welcome/Welcome';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import ChatBox from './components/ChatBox/ChatBox';
import MessagesPage from './components/MessagesPage/MessagesPage'
import Settings from "./components/Settings/Settings"

import { getCurrentUser } from './store/session';
import InterestPage from './components/InterestPage';



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      {/* <NavBar /> */}
      <Switch>
        <ProtectedRoute exact path="/" component={Welcome} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <ProtectedRoute path='/interests' component={InterestPage} />
        <ProtectedRoute path="/messages-page" component={MessagesPage} />
      </Switch>
    </>
  );
}

export default App;