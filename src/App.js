import React, {Fragment} from 'react';
import { compose, lifecycle, withState, withHandlers } from 'recompose';
import openSocket from 'socket.io-client';

const socketConnection = openSocket('http://localhost:3001/');

const App = ({ username, usersOnline, changeUsername, login }) => (
  <Fragment>
    <h1>Realtime communication with WebRTC</h1>
    <label htmlFor="usernameInput">Login</label>
    <input type="text" id="usernameInput" placeholder="Login" onChange={(e) => changeUsername(e.target.value)}/>
      <button id="loginBtn" onClick={() => login()}>
        Sign in
      </button>
    <video autoPlay></video>
    {/*<p>{usersOnline}</p>*/}
  </Fragment>
);

export default compose(
  withState('contsraints', 'setConstraints', {
    audio: false,
    video: {
      width: 400,
      height: 300
    }
  }),
  withState('username', 'changeUsername', ''),
  withState('yourId', 'changeYourId', ''),
  withHandlers({
    login: props => event => {
      socketConnection.emit('join', {
        username: props.username
      });
      socketConnection.on('usersonline', (onlineUsers) => {
        console.log(onlineUsers);
      })
    }
  }),
  lifecycle({
    async componentDidMount(){
      const video = document.querySelector('video');
      video.srcObject = await navigator.mediaDevices.getUserMedia(this.props.contsraints);
      video.play();
    }
  })
)(App);
