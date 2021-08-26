import React from 'react';
import ReactDOM from 'react-dom';
import { getUserLogoutAPI } from './api';

function getUserLogout(displayPage, changeRole) {
  console.log('User logout');
  fetch(getUserLogoutAPI)
    .then((res) => res.json())
    .then((value) => {
      console.log(value);
      changeRole('guest');
      displayPage('home');
    });
}

let guest = (show, displayPage) => (
  <ul>
    <li className={show == 'home' ? 'active' : ''}>
      <a onClick={() => displayPage('home')}>Home</a>
    </li>
    <li className={show == 'activities' ? 'active' : ''}>
      <a onClick={() => displayPage('activities')}>Activities</a>
    </li>
    <li className={show == 'login' ? 'active' : ''}>
      <a onClick={() => displayPage('login')}>Login</a>
    </li>
    <li className={show == 'membership' ? 'active' : ''}>
      <a onClick={() => displayPage('membership')}>Membership</a>
    </li>
  </ul>
);

let member = (show, displayPage, changeRole) => (
  <ul>
    <li className={show == 'home' ? 'active' : ''}>
      <a onClick={() => displayPage('home')}>Home</a>
    </li>
    <li className={show == 'activities' ? 'active' : ''}>
      <a onClick={() => displayPage('activities')}>Activities</a>
    </li>
    <li className={show == 'logout' ? 'active' : ''}>
      <a onClick={() => getUserLogout(displayPage, changeRole)}>Logout</a>
    </li>
  </ul>
);

let admin = (show, displayPage, changeRole) => (
  <ul>
    <li className={show == 'home' ? 'active' : ''}>
      <a onClick={() => displayPage('home')}>Home</a>
    </li>
    <li className={show == 'activities' ? 'active' : ''}>
      <a onClick={() => displayPage('activities')}>Activities</a>
    </li>
    <li className={show == 'manage_activities' ? 'active' : ''}>
      <a onClick={() => displayPage('manage_activities')}>Manage Activities</a>
    </li>
    <li className={show == 'logout' ? 'active' : ''}>
      <a onClick={() => getUserLogout(displayPage, changeRole)}>Logout</a>
    </li>
  </ul>
);

function Menu(props) {
  let { role, show, displayPage, changeRole } = props;
  let menu = guest(show, displayPage);
  if (role == 'guest') menu = guest(show, displayPage);
  else if (role == 'member') menu = member(show, displayPage, changeRole);
  else if (role == 'admin') menu = admin(show, displayPage, changeRole);

  return <nav>{menu}</nav>;
}

export default Menu;
