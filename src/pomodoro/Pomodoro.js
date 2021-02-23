import React, { useState } from "react";
import classNames from "../utils/class-names";
import { minutesToDuration, secondsToDuration } from "../utils/duration";
import useInterval from "../utils/useInterval";

function Pomodoro() {
  // Timer starts out paused
  
  const [isTimerRunning, setIsTimerRunning] = useState(false);  
  const [focusTimer,setFocusTimer] = useState(25);
  const [breakTimer,setBreakTimer] = useState(5);
  const [currentTimer,setCurrentTimer] = useState(focusTimer*60);
  const [isFocus,setFocus] = useState(true);


    const focusTimerIncrement = () => {
      if(focusTimer < 60 ) {
      setFocusTimer(focusTimer+1)
      console.log(currentTimer)
      console.log(focusTimer*60);
      }
      setCurrentTimer((focusTimer+1)*60);

    };    
    const focusTimerDecrement = () => {
      if(focusTimer > 5) {
      setFocusTimer(focusTimer-1)
      }
      setCurrentTimer((focusTimer-1)*60);

    };
    const breakTimerIncrement = () => {
      if(breakTimer < 15) {
      setBreakTimer(breakTimer+1)
      
      }
    };
    const breakTimerDecrement = () => {
      if(breakTimer > 1) {
      setBreakTimer(breakTimer-1)
      }
    };
    const stopButton = () => {
      setCurrentTimer(focusTimer*60)
    }
    

  useInterval(
    () => {
      setCurrentTimer(currentTimer -1)
      if(currentTimer == 0 && isFocus == true) {
        new Audio(`${process.env.PUBLIC_URL}/alarm/submarine-dive-horn.mp3`).play();
        setCurrentTimer(breakTimer*60);
        setFocus(!isFocus);
      }
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              Focus Duration: {secondsToDuration(focusTimer*60)}
              
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={focusTimerDecrement}
              >
                <span className="oi oi-minus" />
              </button>
              
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"                
                onClick={focusTimerIncrement}
              >
                <span className="oi oi-plus" name="focusTime"/>
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {minutesToDuration(breakTimer)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={breakTimerDecrement}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={breakTimerIncrement}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <h2 data-testid="session-title">{isFocus ? "Focusing" : "Breaking"} for {secondsToDuration(currentTimer)} minutes</h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              25:00 remaining
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="0" // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: "0%" }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
