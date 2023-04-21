import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const YearLevelProgress = ({ yearLevel, progress }) => {
  return (
    <div>
      <h2>Year {yearLevel} Progress</h2>
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
      />
    </div>
  );
};

export default YearLevelProgress;
