import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link to={'/'}>Main Page</Link>
          <Link to={'/profile'}>Profile</Link>
          <Link to={'/chatbox'}>Chatbox</Link>
          <Link to={'/messages-page'}>Messages Page</Link>
          <Link to={'/geo-location'}>GeoLocation</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <NavLink to={'/signup'}>Signup</NavLink>
          <NavLink to={'/login'}>Login</NavLink>
        </div>
      );
    }
  }

  return (
    <div id='navbar'>
      <h1>Friend.ly</h1>
      { getLinks() }
    </div>
  );
}

export default NavBar;