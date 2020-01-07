import React from "react";
import Lottie from "react-lottie";
import animationData from "../8808-correct-animation.json";

class Welcome extends React.Component {
  state = {
    diffuculty: "easy",
    category: "9"
  };
  getQuestionsDiffuculty = e => {
    this.setState({ diffuculty: e.target.value });
    this.props.getQuestions(e.target.value, this.state.category);
  };
  getQuestionsCategory = e => {
    this.setState({ category: e.target.value });
    this.props.getQuestions(this.state.diffuculty, e.target.value);
  };
  getStarted = () => {
    this.props.history.push("/questions");
  };
  componentDidMount() {
    this.props.getQuestions(this.state.diffuculty, this.state.category);
  }
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
        <p>A TRIVIA GAME</p>
        <div className="welcome-select">
          <div>
            <select onChange={e => this.getQuestionsDiffuculty(e)}>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          <div>
            <select onChange={e => this.getQuestionsCategory(e)}>
              <option value="9">general knowladge</option>
              <option value="10">books</option>
              <option value="11">films</option>
              <option value="12">music</option>
              <option value="13">musical&theatres</option>
              <option value="14">television</option>
              <option value="15">video games</option>
              <option value="16">board games</option>
              <option value="17">sciense and nature</option>
            </select>
          </div>
        </div>
        <div className="start">
          <button onClick={this.getStarted}>GET STARTED</button>
        </div>
      </div>
    );
  }
}

export default Welcome;
