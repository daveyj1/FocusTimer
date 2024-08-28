import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [shouldCount, setShouldCount] = useState(false);
  const [isTimerDone, setIsTimerDone] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);

  const getTime = () => {
    const timeDelta = time - elapsedTime;
    const hours = Math.floor(timeDelta / 3600);
    const minutes = Math.floor((timeDelta % 3600) / 60);
    const seconds = timeDelta % 60;

    //console.log(timeDelta, hours, minutes, seconds);

    if (timeDelta === 0 && elapsedTime !== 0) {
      setShouldCount(false);
      setIsTimerDone(true);
    }

    setHours(formatNumber(hours));
    setMinutes(formatNumber(minutes));
    setSeconds(formatNumber(seconds));
  };

  const onAddTime = (seconds) => {
    setIsTimerDone(false);
    setIsTransparent(false);
    setTime(time + seconds);
    getTime();
  };

  const formatNumber = (number) => {
    if (number < 10) {
      return '0' + number;
    } else {
      return `${number}`
    }
  }

  useEffect(() => {
    getTime();
  }, [time])

  useEffect(() => {
    const interval = setInterval(() => isTimerDone && setIsTransparent(!isTransparent), 500);

    return () => clearInterval(interval);
  }, [isTimerDone, isTransparent]);

  useEffect(() => {
    const interval = setInterval(() => shouldCount && setElapsedTime(elapsedTime + 1), 1000);
    getTime();

    return () => clearInterval(interval);
  }, [elapsedTime, shouldCount]);



  return (
    <div className='bg-gray-700 flex flex-col h-screen w-screen font-extrabold'>
      <div className='justify-start m-5 flex flex-col'>
        <h1 className='text-5xl text-blue-400 my-2'>Focus Timer!</h1>
        <h2 className='text-3xl text-white mt-2'>Select a time and get to work!</h2>
      </div>
      <div  className='flex flex-col content-center justify-center text-center h-screen'>
        <div className='my-3 flex-row flex justify-center'>
          <p className='text-white text-6xl text-center mr-3'>Time Remaing:</p>
          {!isTransparent && <p className='text-blue-400 text-6xl text-center'>{hours}:{minutes}:{seconds}</p>}
          {isTransparent && <p className='text-transparent text-6xl text-center'>{hours}:{minutes}:{seconds}</p>}
        </div>
        <div className='content-center text-center my-5'>
          <button onClick={() => onAddTime(30)} className='bg-blue-400 text-white font-bold mx-2 border-2 rounded-lg p-3 h-20 w-40 text-center hover:bg-white hover:text-blue-400'>+30 Seconds</button>
          <button onClick={() => onAddTime(60)} className='bg-blue-400 text-white font-bold mx-2 border-2 rounded-lg p-3 h-20 w-40 text-center hover:bg-white hover:text-blue-400'>+1 Minute</button>
          <button onClick={() => onAddTime(300)} className='bg-blue-400 text-white font-bold mx-2 border-2 rounded-lg p-3 h-20 w-40 text-center hover:bg-white hover:text-blue-400'>+5 Minutes</button>
          <button onClick={() => onAddTime(600)} className='bg-blue-400 text-white font-bold mx-2 border-2 rounded-lg p-3 h-20 w-40 text-center hover:bg-white hover:text-blue-400'>+10 Minutes</button>
        </div>
        <div className='text-center'>
          <button className='bg-green-600 font-bold mx-2 border-2 rounded-lg p-3 h-20 w-40 text-center' onClick={() => setShouldCount(!shouldCount)}>Start Timer</button>
          <button className='bg-red-400 font-bold mx-2 border-2 rounded-lg p-3 h-20 w-40 text-center' onClick={() => {setTime(0); setElapsedTime(0); setShouldCount(false); getTime();}}>Reset Timer</button>
        </div>
      </div>
    </div>
  );
}

export default App
