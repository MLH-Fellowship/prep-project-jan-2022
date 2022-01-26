import React from 'react';
import Lottie from 'react-lottie';

export default class LottieControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isStopped: false, isPaused: false };
  }

  render() {
    const buttonStyle = {
      display: 'block',
      margin: '10px auto',
    };

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
          height={400}
          width={400}
          isStopped={isStopped}
          isPaused={isPaused}
        />
        <button
          type="button"
          style={buttonStyle}
          onClick={() => this.setState({ isStopped: true })}
        >
          stop
        </button>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => this.setState({ isStopped: false })}
        >
          play
        </button>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => this.setState({ isPaused: !isPaused })}
        >
          pause
        </button>
      </div>
    );
  }
}
