import React from 'react';
import './score.css';

export default function Score(props: any) {
  const resultStyle = {
    color: props.result === 'Pass' ? 'green' : 'red',
  };

  const onPlayAgain = () => {
    props.endGame(false);
  };

  return (
    <div className="mainSection">
      <div className="topSection">
        <h1 className="quizScore">Quiz Score</h1>
        <div className="scoreCircle">
          <div className="scoreOuter">
            <div className="scoreMiddle">
              <div className="scoreInner">
                <p className="points">{props.score} pt</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scoreBar">
        <ul className="ulScore">
          <h3 className="summary">Summary</h3>
          <li className="question">
            Question: <span>{props.question}</span>
          </li>
          <li className="correct">
            Correct: <span className="correctans">{props.correct}</span>
          </li>
          <li className="wrong">
            Wrong: <span className="wrongans">{props.wrong}</span>
          </li>
          <li style={resultStyle}>
            Result: <span>{props.result}</span>
          </li>
        </ul>
      </div>
      <button type="button" className="playAgain" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
}
