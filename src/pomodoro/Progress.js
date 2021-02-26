import React, { useState } from 'react';
import { minutesToDuration, secondsToDuration } from "../utils/duration";
import classNames from "../utils/class-names";


function Progress({progressVisibility,isFocus,focusTimer,breakTimer,currentTimer,progress}) {

    return (
        <div className={classNames({
            "d-none":!progressVisibility})}>
            {/* TODO: This area should show only when a focus or break session is running or pauses */}
            <div className="row mb-2">
              <div className="col">
                {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
                <h2 data-testid="session-title">{isFocus ? "Focusing" : "On Break"} for {isFocus ? minutesToDuration(focusTimer) : minutesToDuration(breakTimer)} minutes</h2>
                {/* TODO: Update message below to include time remaining in the current session */}
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
                    aria-valuenow= {progress} // TODnO: Increase aria-valuenow as elapsed time increases
                    style={{ width: (progress + "%") }} // TODO: Increase width % as elapsed time increases
                  />
                </div>
              </div>
            </div>
          </div>
    );
}

export default Progress;