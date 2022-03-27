import React from 'react';
import PropTypes from 'prop-types';
import './CircularProgress.css';

const CircularProgress = ({ progress, diameter }) => {
  const barStyle = {
    clip: `rect(0px, auto, auto, ${diameter / 2}px)`,
  };

  const progressStyle = {
    clip: `rect(0px, ${diameter / 2}px, auto, 0px)`,
  };

  return (
    <div
      className="circular"
      style={{
        width: `${diameter}px`,
        height: `${diameter}px`,
      }}
    >
      <div
        className="inner"
        style={{
          width: `${diameter - 20}px`,
          height: `${diameter - 20}px`,
        }}
      />
      <div className="circle">
        <div
          className="bar left"
          style={barStyle}
        >
          <div
            className="progress"
            style={{
              ...progressStyle,
              transform: (progress >= 50) ? 'rotate(180deg)' : `rotate(${progress * 3.6}deg)`,
            }}
          />
        </div>
        <div
          className="bar right"
          style={barStyle}
        >
          <div
            className="progress"
            style={{
              ...progressStyle,
              transform: (progress <= 50) ? 'rotate(0deg)' : `rotate(${progress * 3.6 - 180}deg)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

CircularProgress.propTypes = {
  progress: PropTypes.string.isRequired,
  diameter: PropTypes.string.isRequired,
};

export default CircularProgress;
