import React, { useState } from 'react';
import { minutesToDuration, secondsToDuration } from "../utils/duration";
import classNames from "../utils/class-names";


function Progress({progressVisibility,isFocus,focusTimer,breakTimer,currentTimer,progress}) {

    return (
        <div className={classNames({
            "d-none":!progressVisibility})}>
            <div className="row mb-2">
              <div className="col">
                <h2 data-testid="session-title">{isFocus ? "Focusing" : "On Break"} for {isFocus ? minutesToDuration(focusTimer) : minutesToDuration(breakTimer)} minutes</h2>
                <p className="lead" data-testid="session-sub-title">
                  {secondsToDuration(currentTimer)} remaining
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
                    aria-valuenow= {progress} 
                    style={{ width: (progress + "%") }}
                  />
                </div>
              </div>
            </div>
          </div>
    );
}

export default Progress;