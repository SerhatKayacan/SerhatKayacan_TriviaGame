import React, { useState, useEffect } from "react";
import useInterval from "@use-it/interval";

const Question = props => {
  const [timer, settimer] = useState(15);
  let questionObject = props.questions[props.index];
  const [newAnswers, setAnswers] = useState([]);
  const checkAnswer = e => {
    if (e.target.value === questionObject.correct_answer) {
      if (props.index === 9) {
        props.history.push("/gamedone");
      } else {
        props.incrementScore(timer);
        props.history.push("/correct");
      }
    } else {
      props.history.push("/gameover");
    }
  };
  useEffect(() => {
    let newAnswerss = [...questionObject.incorrect_answers];
    newAnswerss.push(questionObject.correct_answer);
    newAnswerss.sort(() => Math.random() - 0.5);
    setAnswers(newAnswerss);
  }, [questionObject]);
  useInterval(() => {
    settimer(timer - 1);
    if (timer === 0) {
      props.history.push("/timeup");
    }
  }, 1000);

  return (
    <div>
      <div className="question-top">
        <div>Question {props.index + 1}/10</div>
        <div>{props.totalScore} points</div>
        <div>Remaining Time: {timer}</div>
      </div>
      <p>{questionObject.question}</p>
      {newAnswers.map(answer => {
        return (
          <div key={answer} className="question-button">
            <button value={answer} onClick={checkAnswer}>
              {answer}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Question;
