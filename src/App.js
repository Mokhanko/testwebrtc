import React, {Fragment} from 'react';
import { compose, withState, lifecycle } from 'recompose';

const App = () => (
  <Fragment>
    <h1>Realtime communication with WebRTC</h1>
    <video autoPlay></video>
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
  lifecycle({
    async componentDidMount(){
      const video = document.querySelector('video');
      video.srcObject = await navigator.mediaDevices.getUserMedia(this.props.contsraints);
      video.play();
    }
  })
)(App);
