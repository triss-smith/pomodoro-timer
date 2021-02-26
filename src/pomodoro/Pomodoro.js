import React, { useState } from "react";
import classNames from "../utils/class-names";
import { minutesToDuration, secondsToDuration } from "../utils/duration";
import useInterval from "../utils/useInterval";
import Progress from "./Progress.js";
import FocusButtons from "./FocusButtons.js";
import BreakButtons from "./BreakButtons.js"

function Pomodoro() {
  // Timer starts out paused
  
  const [isTimerRunning, setIsTimerRunning] = useState(false);  
  const [focusTimer,setFocusTimer] = useState(25);
  const [breakTimer,setBreakTimer] = useState(5);
  const [currentTimer,setCurrentTimer] = useState(focusTimer*60);
  const [isFocus,setFocus] = useState(true);
  const [percent,setPercent] = useState((focusTimer*60)/100);
  const [progress,setProgress] = useState(0);
  const [percentCounter,setPercentCounter] = useState(1);
  const [progressVisibility,setProgressVisibility] = useState(false);
  
  

    const focusTimerIncrement = () => {
      if(focusTimer < 60 && focusTimer >= 5 ) {
        setCurrentTimer((focusTimer+5)*60);
      setFocusTimer(focusTimer+5) 
      setPercent((focusTimer*60)/100)  
      } 
    };    
    const focusTimerDecrement = () => {
      
      if(focusTimer > 5 && focusTimer <= 60) {
        setCurrentTimer((focusTimer-5)*60)
      setFocusTimer(focusTimer-5)
      setPercent((focusTimer*60)/100)
      }

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
      setCurrentTimer(focusTimer*60);
      setIsTimerRunning(false);
      setProgress(0);
      setFocus(true);
      setPercentCounter(0);
      setProgressVisibility(false);
    }
    

  useInterval(
    () => {
      setPercentCounter((previous) => previous +1)
      if((percentCounter  + (percent - Math.floor(percent))) >= percent) {
        
        setProgress((previous) => previous + 1);
       setPercentCounter(1);
      }
      
      
      
      setCurrentTimer(currentTimer -1)
      if(currentTimer == 1 && isFocus == true  ) {
        new Audio(`${process.env.PUBLIC_URL}/alarm/submarine-dive-horn.mp3`).play();
        setCurrentTimer(breakTimer*60);
        setFocus((previous) => !previous);
        setPercent((breakTimer*60)/100);
        setPercentCounter(1);
        setProgress(0)
      }
      else if(currentTimer == 1 && isFocus == false) {
        new Audio(`${process.env.PUBLIC_URL}/alarm/submarine-dive-horn.mp3`).play();
        setCurrentTimer(focusTimer*60);
        setFocus((previous) => !previous);
        setPercent((focusTimer*60)/100);
        setPercentCounter(1);
        setProgress(0)
      }
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
    setProgressVisibility(true)
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <FocusButtons focusTimer={focusTimer} focusTimerIncrement={focusTimerIncrement} focusTimerDecrement={focusTimerDecrement} isTimerRunning={isTimerRunning} />
        <BreakButtons breakTimer={breakTimer} breakTimerIncrement={breakTimerIncrement} breakTimerDecrement={breakTimerDecrement} isTimerRunning={isTimerRunning} />

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
              onClick={stopButton}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <Progress progressVisibility={progressVisibility} isFocus={isFocus} focusTimer={focusTimer} breakTimer={breakTimer} currentTimer={currentTimer} progress={progress} />
    </div>
  );
}

export default Pomodoro;
