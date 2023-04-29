import './App.css';
import { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Alert } from 'bootstrap';
import { AuthContext } from './contexts/AuthProvider';
import Home from './views/Home';
import LoginView from './views/LoginView';
import UserProfile from './views/UserProfile';
import CharSearch from './views/CharSearch';
import CharProfile from './views/SelectedChar';
import Achievements from './views/Achievements';
import Mounts from './views/Mounts';
import Minions from './views/Minions';
import CreateAlert from './components/CreateAlert';

export default function App() {
  const { user, googleLogin, logout } = useContext(AuthContext)

  useEffect(() => {
    if (user.loggedIn == true) {
      CreateAlert(`Successfully logged in. Welcome back, ${user.displayName}!`, 'success')
    } else if (user.loggedIn == false) {
      CreateAlert('Successfully logged out.', 'dark')
    }
  }, [user.loggedIn])

  return (
    <div className="App" id="app">
      <BrowserRouter>
        <nav id="navibar" className="navbar navbar-expand-lg px-3 pb-0">
          <div className="container-fluid">
            <ul id="left-nav" className="navbar-nav align-items-center mt-3 gap-4">
              <li className="nav-item"><Link to="/" className="nav-link active link-light"><strong>Home</strong></Link></li>
              {
                (user.loggedIn) ?
                <>
                  <li className="nav-item"><Link to="/selected-char" className="nav-link active link-light"><strong>Selected Character</strong></Link></li>
                </> :
                <></>
              }
              <li className="nav-item"><Link to="/search" className="nav-link active link-light"><strong>Search</strong></Link></li>
            </ul>
            <ul id="right-nav" className="navbar-nav align-items-center">
              {
                (user.loggedIn) ?
                <>
                <li className="nav-item text-light mt-2"><strong>Logged in as:</strong></li>
                <li className="nav-item text-light mt-2"><Link to="/user-profile" id="current-user" className="nav-link active"><strong>{ user.email }</strong></Link></li>
                <li className="nav-item nav-link active mx-3"><button id="logoutBtn" onClick={logout}  className="btn btn-danger mt-3"><strong>Logout</strong></button></li>
                </> :
                <>
                <li className="nav-item nav-link active mx-3 mt-3"><button id="navLoginBtn" onClick={googleLogin} className="btn btn-warning"><strong>Login</strong></button></li>
                </>
              }
              <li className="text-white text-end" id="titlehead">
                <h2><strong>Eorzea Collect XIV</strong></h2>
                <p>Powered by <a href="https://ffxivcollect.com/" target="_blank"><strong>FFXIV Collect</strong></a> and <a href="https://xivapi.com/" target="_blank"><strong>xivapi</strong></a></p>
              </li>
            </ul>
          </div>
        </nav>
        <hr id="navbar-line" className="mt-4"/>
        <div id="liveAlertBar"></div>
        <Routes>
          <Route path="/" element={
            (user.loggedIn) ?
            <Home /> :
            <LoginView />
          } />
          <Route path="/search" element={
            <CharSearch />
          } />
          <Route path="/user-profile" element={
            (user.loggedIn) ?
            <UserProfile /> :
            <LoginView />
          } />
          <Route path="/selected-char" element={
            (user.loggedIn) ?
            <CharProfile /> :
            <LoginView />
          } />
          <Route path="/achievements" element={
            (user.loggedIn) ?
            <Achievements /> :
            <LoginView />
          } />
          <Route path="/mounts" element={
            (user.loggedIn) ?
            <Mounts /> :
            <LoginView />
          } />
          <Route path="/minions" element={
            (user.loggedIn) ?
            <Minions /> :
            <LoginView />
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
};