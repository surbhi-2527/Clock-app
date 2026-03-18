import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  // CLOCK
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // COUNTDOWN TIMER
  const [timer, setTimer] = useState(0);
  const [inputTime, setInputTime] = useState("");
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (timerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }

    if (timer === 0 && timerRunning) {
      setTimerRunning(false);
      alert("⏰ Time's Up!");
    }

    return () => clearInterval(interval);
  }, [timerRunning, timer]);

  const startTimer = () => {
    if (inputTime > 0) {
      setTimer(parseInt(inputTime));
      setTimerRunning(true);
    }
  };

  // STOPWATCH
  const [stopwatch, setStopwatch] = useState(0);
  const [swRunning, setSwRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (swRunning) {
      interval = setInterval(() => {
        setStopwatch(prev => prev + 10);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [swRunning]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return (
      String(hours).padStart(2, "0") + ":" +
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0") + ":" +
      String(milliseconds).padStart(2, "0")
    );
  };

  return (
    <div className="App">

      <h1 className="clock">{time}</h1>

      <div className="container">

        {/* TIMER */}
        <div className="box">
          <h2>Countdown Timer</h2>

          <input
            type="number"
            placeholder="Enter seconds"
            value={inputTime}
            onChange={(e) => setInputTime(e.target.value)}
          />

          <p className="display">{timer}s</p>

          <button onClick={startTimer}>Start</button>
          <button onClick={() => setTimerRunning(false)}>Stop</button>
          <button onClick={() => {
            setTimer(0);
            setInputTime("");
            setTimerRunning(false);
          }}>Reset</button>
        </div>

        {/* STOPWATCH */}
        <div className="box">
          <h2>Stopwatch</h2>

          <p className="display">{formatTime(stopwatch)}</p>

          <button onClick={() => setSwRunning(true)}>Start</button>
          <button onClick={() => setSwRunning(false)}>Stop</button>
          <button onClick={() => {
            setStopwatch(0);
            setSwRunning(false);
          }}>Reset</button>
        </div>

      </div>

    </div>
  );
}

export default App;