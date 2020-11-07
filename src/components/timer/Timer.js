import React, { useState, useEffect } from 'react';
import { Progress } from 'rsuite';
import './Timer.css';

const Timer = ({ milliseconds }) => {
  const { Line } = Progress;
  const [over, setOver] = useState(false);
  const [time, setTime] = React.useState({
    minutes: parseInt(milliseconds / 60000),
    seconds: parseInt(0),
  });
  const [percentage, setPercentage] = useState(0);

  // The countdown function
  const tick = () => {
    if (over) return;

    if (time.minutes === 0 && time.seconds === 0) {
      setOver(true);
      // If minutes and seconds is 0 then countdown over so 100 percent
      setPercentage(100);
    } else if (time.seconds === 0) {
      setTime({
        minutes: time.minutes - 1,
        seconds: 59,
      });
      // Calculating the percentage
      const newMilliSeconds = (time.minutes * 60 + time.seconds) * 1000;
      const decrease = milliseconds - newMilliSeconds;
      setPercentage((decrease / milliseconds) * 100);
    } else {
      setTime({
        ...time,
        seconds: time.seconds - 1,
      });
      // Calculating the percentage
      const newMilliSeconds = (time.minutes * 60 + time.seconds) * 1000;
      const decrease = milliseconds - newMilliSeconds;
      setPercentage(Math.floor((decrease / milliseconds) * 100));
    }
  };

  useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <div className='timer-container'>
      <div className='timer-countdown'>
        {time.minutes.toString().padStart(2, '0')}:
        {time.seconds.toString().padStart(2, '0')}
      </div>
      <div className='timer-percentage'>
        <Line percent={percentage} status='active' showInfo={false} />
      </div>
    </div>
  );
};

export default Timer;