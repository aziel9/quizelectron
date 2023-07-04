import React, { useState } from 'react';
import './start.css';
import Home from 'pages/Home';

export default function Start() {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [startQuiz, setStartQuiz] = useState(false);

  const handleGrade = (grade) => {
    setSelectedGrade(grade);
  };

  const handleSubject = (subject) => {
    setSelectedSubject(subject);
  };

  const isQuizStartEnabled = selectedGrade && selectedSubject;

  const startQuizGame = () => {
    setStartQuiz(true);
  };

  const endGame = (para) => {
    setSelectedGrade(null);
    setSelectedSubject(null);
    setStartQuiz(para);
  };

  return (
    <div>
      {startQuiz ? (
        <Home
          grade={selectedGrade}
          subject={selectedSubject}
          endGame={endGame}
        />
      ) : (
        <div className="mainTitle">
          <div className="topTitle">
            <h1 className="quizTime">Quiz Time</h1>
          </div>
          <div className="selectGrade">
            <div className="gradeHeading">
              <h2 className="selectGradeHeading">Select Grades</h2>
            </div>
            <div className="gradeNum">
              <div className="gradeRow">
                <div
                  className={`grade ${selectedGrade === 5 ? 'selected' : ''}`}
                  onClick={() => handleGrade(5)}
                >
                  Grade 5
                </div>
                <div
                  className={`grade ${selectedGrade === 6 ? 'selected' : ''}`}
                  onClick={() => handleGrade(6)}
                >
                  Grade 6
                </div>
              </div>
              <div className="gradeRow">
                <div
                  className={`grade ${selectedGrade === 7 ? 'selected' : ''}`}
                  onClick={() => handleGrade(7)}
                >
                  Grade 7
                </div>
                <div
                  className={`grade ${selectedGrade === 8 ? 'selected' : ''}`}
                  onClick={() => handleGrade(8)}
                >
                  Grade 8
                </div>
              </div>
            </div>
          </div>
          <div className="selectSubject">
            <div className="subjectHeading">
              <h2 className="selectSubjectHeading">Select Subject</h2>
            </div>
            <div className="subjectName">
              <div className="subjectRow">
                <div
                  className={`subject ${
                    selectedSubject === 'math' ? 'selected' : ''
                  }`}
                  onClick={() => handleSubject('math')}
                >
                  Math
                </div>
                <div
                  className={`subject ${
                    selectedSubject === 'science' ? 'selected' : ''
                  }`}
                  onClick={() => handleSubject('science')}
                >
                  Science
                </div>
              </div>
              <div className="subjectRow">
                <div
                  className={`subject ${
                    selectedSubject === 'social' ? 'selected' : ''
                  }`}
                  onClick={() => handleSubject('social')}
                >
                  Social
                </div>
                <div
                  className={`subject ${
                    selectedSubject === 'history' ? 'selected' : ''
                  }`}
                  onClick={() => handleSubject('history')}
                >
                  History
                </div>
              </div>
            </div>
          </div>
          {isQuizStartEnabled && (
            <button type="button" className="startQuiz" onClick={startQuizGame}>
              Start Quiz
            </button>
          )}
        </div>
      )}
    </div>
  );
}
