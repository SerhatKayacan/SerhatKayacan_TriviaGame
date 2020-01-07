import React from "react";
import Lottie from "react-lottie";
import animationData from "../8808-correct-animation.json";

class CorrectAnswer extends React.Component {
  nextquestion = () => {
    this.props.incrementindex();
    this.props.history.push("/questions");
  };
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    return (
      <div>
        <Lottie options={defaultOptions} height={400} width={400} />
        <p>Correct!</p>
        <p>You have earned {this.props.earnedScore} points</p>
        <p>Total: {this.props.totalScore} points</p>

        <div className="correct-button">
          <button onClick={this.nextquestion}>next question</button>
        </div>
      </div>
    );
  }
}

export default CorrectAnswer;
