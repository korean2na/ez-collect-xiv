import './App.css';
import { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthContext } from './contexts/AuthProvider';
import Home from './views/Home';
import LoginView from './views/LoginView';
import CharSearch from './views/CharSearch';
import CharProfile from './views/CharProfile';

export default function App() {
  const { user, googleLogin, logout } = useContext(AuthContext)

  // Partially works, just creates extra alerts on initial load.
  // useEffect(() => {
  //   const alertBar = document.getElementById('liveAlertBar')

  //   const alert = (message, type) => {
  //     const wrapper = document.createElement('div')
  //     wrapper.innerHTML = [
  //       `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
  //       `   <div>${message}</div>`,
  //       '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
  //       '</div>'
  //     ].join('')
  
  //     alertBar.append(wrapper)
  //   }

  //   if (user.loggedIn == true) {
  //     alert(`Successfully logged in. Welcome back, ${user.displayName}!`, 'success')
  //   } else if (user.loggedIn == false) {
  //     alert('Successfully logged out.', 'dark')
  //   }
  // }, [user.loggedIn])

  return (
    <div className="App" id="app">
      <BrowserRouter>
        <nav id="navibar" className="navbar navbar-expand-lg px-3 pb-0">
          <div className="container-fluid">
            <ul id="left-nav" className="navbar-nav align-items-center gap-4">
              <li className="nav-item"><Link to="/" className="nav-link active link-light"><strong>Home</strong></Link></li>
              <li className="nav-item"><Link to="/search" className="nav-link active link-light"><strong>Search</strong></Link></li>
            </ul>
            <ul id="right-nav" className="navbar-nav align-items-center">
              {
                (user.loggedIn) ?
                <>
                <li className="nav-item text-light"><strong>Logged in as:</strong></li>
                <li className="nav-item text-light"><Link to="" id="current-user" className="nav-link active"><strong>{ user.email }</strong></Link></li>
                <li className="nav-item nav-link active mx-3"><button id="logoutBtn" onClick={logout}  className="btn btn-danger"><strong>Logout</strong></button></li>
                </> :
                <>
                <li className="nav-item text-light"><strong>(Currently not logged in.)</strong></li>
                <li className="nav-item nav-link active"><button id="navLoginBtn" onClick={googleLogin} className="btn btn-warning"><strong>Login</strong></button></li>
                </>
              }
              <li className="text-white text-end" id="titlehead">
                <h2><strong>Eorzea Collect XIV</strong></h2>
                <p>Powered by <a href="https://ffxivcollect.com/" target="_blank"><strong>FFXIV Collect</strong></a> and <a href="https://xivapi.com/" target="_blank"><strong>xivapi</strong></a></p>
              </li>
            </ul>
          </div>
        </nav>
        <hr />
        <div id="liveAlertBar"></div>
        <Routes>
          <Route path="/" element={
            (user.loggedIn) ?
            <>
            <Home />
            </> :
            <>
            <LoginView />
            </>} />
          <Route path="/search" element={<CharSearch />} />
          <Route path="/profile" element={<CharProfile />} />
          {/* <Route path="/profile" element={
            (user.loggedIn) ?
            <>
            <Profile />
            </> :
            <>
            <LoginView />
            </>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};