import React from "react";

const GameOver = props => {
  return (
    <div>
      <p>wrong answer</p>
      <p>game over</p>
      <p>your score is: {props.totalScore}</p>
    </div>
  );
};

export default GameOver;
