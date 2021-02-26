import React from 'react';
import { minutesToDuration, secondsToDuration } from "../utils/duration";


function FocusButtons({focusTimer,focusTimerIncrement,focusTimerDecrement,isTimerRunning}) {
    return (
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              Focus Duration: {minutesToDuration(focusTimer)}
              
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={focusTimerDecrement}
                disabled={isTimerRunning}

              >
                <span className="oi oi-minus" />
              </button>
              
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"                
                onClick={focusTimerIncrement}
                disabled={isTimerRunning}

              >
                <span className="oi oi-plus" name="focusTime"/>
              </button>
            </div>
          </div>
        </div>
    );
}

export default FocusButtons;