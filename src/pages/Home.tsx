import React, { useState, useEffect, useCallback } from 'react';
import './home.css';
import Score from './Score/Score';

export default function Home(props: any) {
  interface SentData {
    event: string;
    filename: string;
  }

  interface QuizQuestion {
    question: string;
    options: string[];
    answer: string;
  }

  interface QuizData {
    questions: QuizQuestion[];
  }

  const [quiz, setQuiz] = useState<QuizData>({ questions: [] });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [timer, setTimer] = useState(20);
  const [correctans, setCorrectans] = useState(0);
  const [wrongans, setWrongans] = useState(0);
  const [result, setResult] = useState('');
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const sentData: SentData = {
      event: 'GetQuiz',
      filename: `${props.grade}${props.subject}.json`,
    };

    window.electron.ipcRenderer.sendMessage('Quiz-data', sentData);

    window.electron.ipcRenderer.once('Quiz-data', async (arg: any) => {
      const data = await arg;
      setQuiz(data);
    });
  }, []);

  const handleNextButton = useCallback(() => {
    if (selectedOption === quiz.questions[currentQuestion].answer) {
      setScore(score + 1);
      setCorrectans(correctans + 1);
      // setSelectedOption('');
    } else {
      setWrongans(wrongans + 1);
      // setSelectedOption('');
    }

    setSelectedOption('');
    setTimer(20);

    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate the total time here
      setShowScore(true);

      const percentage = (score / quiz.questions.length) * 100;
      setResult(percentage >= 70 ? 'Pass' : 'Fail');
    }
  }, [
    correctans,
    currentQuestion,
    quiz.questions,
    score,
    selectedOption,
    wrongans,
  ]);

  useEffect(() => {
    let timeLeft;

    if (timer > 0 && !showScore) {
      timeLeft = setTimeout(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && !showScore) {
      handleNextButton();
    }

    return () => clearTimeout(timeLeft);
  }, [timer, showScore, handleNextButton]);

  const isNextButtonVisible = selectedOption !== '';

  return (
    <div>
      {showScore ? (
        <Score
          score={score}
          question={quiz.questions.length}
          correct={correctans}
          wrong={wrongans}
          result={result}
          // onPlayAgain={handlePlayAgain}
          endGame={props.endGame}
        />
      ) : (
        <div className="main">
          <div className="top">
            <h1 className="heading">Quiz</h1>
          </div>
          <div className="questionBar">
            <div id="timer" className="timer">
              {timer}
            </div>
            <div className="qstnNumber">
              Question {currentQuestion + 1}/{quiz.questions.length}
            </div>
            <div className="qstn">
              {quiz.questions[currentQuestion]?.question}
            </div>
          </div>
          <div className="optionBar">
            <ul className="ulQuiz">
              {quiz.questions[currentQuestion]?.options.map((option) => (
                <li className="liQuiz" key={option}>
                  <label htmlFor={option} className="labelOption">
                    <input
                      type="radio"
                      name="option"
                      id={option}
                      value={option}
                      onChange={() => setSelectedOption(option)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="next">
            {isNextButtonVisible && (
              <button
                type="button"
                className="nextQuiz"
                onClick={handleNextButton}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
