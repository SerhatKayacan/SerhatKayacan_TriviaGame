import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CorrectAnswer from "./components/correct";
import Welcome from "./components/welcome";
import Question from "./components/question";
import TimeUpPage from "./components/timeupPage";
import GameOver from "./components/gameend";
import GameDone from "./components/gamedone";

class App extends React.Component {
  state = {
    questions: [],
    index: 0,
    totalScore: 0,
    earnedScore: 0
  };
  getQuestions = async (diffuciulty, category) => {
    let url = `http://opentdb.com/api.php?amount=10&category=${category}&difficulty=${diffuciulty}&type=multiple`;
    let data = await fetch(url);
    let questionsData = await data.json();
    questionsData.results.map(result => {
      result.question = result.question.replace(
        /&(amp|#039|lt|gt|quot);/g,
        function(m, p) {
          return p === "amp"
            ? "&"
            : p === "#039"
            ? "'"
            : p === "lt"
            ? "<"
            : p === "gt"
            ? ">"
            : "'";
        }
      );
    });
    this.setState({ questions: questionsData.results });
    console.log(questionsData.results);
  };
  incrementindex = () => {
    const index = this.state.index + 1;
    this.setState({ index: index });
  };
  incrementScore = score => {
    this.setState({ earnedScore: score });
    const totalscore = this.state.totalScore + score;
    this.setState({ totalScore: totalscore });
  };
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Welcome {...props} getQuestions={this.getQuestions} />
              )}
            />
            <Route
              exact
              path="/correct"
              render={props => (
                <CorrectAnswer
                  {...props}
                  incrementindex={this.incrementindex}
                  earnedScore={this.state.earnedScore}
                  totalScore={this.state.totalScore}
                />
              )}
            />
            <Route
              exact
              path="/questions"
              render={props => (
                <Question
                  {...props}
                  questions={this.state.questions}
                  index={this.state.index}
                  incrementScore={this.incrementScore}
                  totalScore={this.state.totalScore}
                />
              )}
            />
            <Route
              exact
              path="/timeup"
              render={props => <TimeUpPage {...props} />}
            />
            <Route
              exact
              path="/gameover"
              render={props => (
                <GameOver {...props} totalScore={this.state.totalScore} />
              )}
            />
            <Route
              exact
              path="/gamedone"
              render={props => <GameDone {...props} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
