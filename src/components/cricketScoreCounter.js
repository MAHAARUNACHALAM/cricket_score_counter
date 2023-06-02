import React, { useState } from 'react';
import './CricketScoreCounter.css';

const CricketScoreCounter = () => {
  const [innings, setInnings] = useState(1);
  const [score, setScore] = useState(0);
  const [ballsRemaining, setBallsRemaining] = useState(120);
  const [wideBalls, setWideBalls] = useState(0);
  const [noBalls, setNoBalls] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [targetScore, setTargetScore] = useState(null);
  const [winner, setWinner] = useState(null);

  const handleRunClick = (runs) => {
    setScore(score + runs);
    setBallsRemaining(ballsRemaining - 1);

    if (innings === 1 && wickets >= 9 || ballsRemaining === 0) {
      setInnings(2);
      setScore(0);
      setBallsRemaining(120);
      setWickets(0);
      setTargetScore(score);
    } else if (innings === 2 && ballsRemaining === 0) {
      declareWinner();
    }
  };

  const handleWideBallClick = () => {
    setScore(score + 1);
    setWideBalls(wideBalls + 1);
  };

  const handleNoBallClick = () => {
    setScore(score + 1);
    setNoBalls(noBalls + 1);
  };

  const handleWicketClick = () => {
    if (wickets < 10) {
      setWickets(wickets + 1);
    }
    setBallsRemaining(ballsRemaining - 1);

    if (innings === 1 && wickets >= 9) {
      setInnings(2);
      setScore(0);
      setBallsRemaining(120);
      setWickets(0);
      setTargetScore(score);
    } else if (innings === 2 && wickets === 10) {
      declareWinner();
    }
  };

  const declareWinner = () => {
    let winner;
    if (score > targetScore) {
      winner = innings === 1 ? 'Team B' : 'Team A';
    } else {
      winner = 'No Result';
    }
    setWinner(winner);
  };

  return (
    <div className="CricketScoreCounter">
      <h2>Cricket Score Counter</h2>
      {winner ? (
        <div className="winner">Winner: {winner}</div>
      ) : (
        <>
        <div className="score-info">
          <div className="innings">Innings: {innings}</div>
          <div className="score">Score: {score}</div>
          {innings === 2 && targetScore && (
            <div className="target-score">Target Score: {targetScore}</div>
          )}
          <div className="balls-remaining">Balls Remaining: {ballsRemaining}</div>
          <div className="wide-balls">Wide Balls: {wideBalls}</div>
          <div className="no-balls">No Balls: {noBalls}</div>
          <div className="wickets">Wickets: {wickets}</div>
        </div>
      
      <div className="buttons-container">
        <button onClick={() => handleRunClick(0)}>0</button>
        <button onClick={() => handleRunClick(1)}>1</button>
        <button onClick={() => handleRunClick(2)}>2</button>
        <button onClick={() => handleRunClick(3)}>3</button>
        <button onClick={() => handleRunClick(4)}>4</button>
        <button onClick={() => handleRunClick(6)}>6</button>
        <button onClick={handleWideBallClick}>Wide Ball</button>
        <button onClick={handleNoBallClick}>No Ball</button>
        <button onClick={handleWicketClick}>Wicket</button>
      </div>
      </>
      )}
    </div>
  );
};

export default CricketScoreCounter;
