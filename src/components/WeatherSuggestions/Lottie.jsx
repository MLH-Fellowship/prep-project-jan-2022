import React from 'react';
import Lottie from 'react-lottie';

export default class LottieControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isStopped: false, isPaused: false };
  }

  render() {
    const { animationData } = this.props;

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };

    const { isStopped, isPaused } = this.state;

    return (
      <div>
        <Lottie
          options={defaultOptions}
          height="15rem"
          width="15rem"
          isStopped={isStopped}
          isPaused={isPaused}
        />
      </div>
    );
  }
}
