// import React, { useState,useEffect } from 'react';
// import { useRef } from 'react';
// import {FaPlay,FaPause,FaVolumeUp,FaVolumeMute} from "react-icons/fa";
// const AudioPlayer = ({audiosrc,image}) => {
//   const [duartion,setDuration]=useState(0);
//   const [currentTime,setCurrentTime]=useState(0);
//   const [volume,setVolume]=useState(1);
//   const [isplaying,setisplaying]=useState(true);
//   const [mute,setMute]=useState(true);

//   const audioRef=useRef();

//   function handleDuartion(e)
//   {
//     setDuration(e.target.value);
//   }
//   function handleVolume(e)
//   {
//      setVolume();
//      audioRef.current.volume=e.target.value;
//   }


//   function toggle()
//   {
//     if(isplaying)
//     {
//       setisplaying(false);
//     }else{
//       setisplaying(true);
//     }
//   }
//   function toggle2()
//   {
//     if(mute)
//     {
//       setMute(false);
//     }else
//     { 
//       setMute(true);
//     }
//   }

//   useEffect(()=>{
//      if(isplaying)
//      {
//         audioRef.current.play();
//      }else{
//         audioRef.current.pause();
//      }
//   },[isplaying]);

//   useEffect(()=>{
//     if(mute){
//        audioRef.current.volume=1;
//        setVolume(1);
//     }else{
//         audioRef.current.volume=0;
//         setVolume(0);
//     }
//   },[mute])

 
//   return (
//     <div className='Custom-audio-palyer'>
//         <img class="custom-display-image" src={image}/>
//         <audio ref={audioRef} src={audiosrc}/>
//        <p onClick={toggle}>{isplaying?<FaPause/>: <FaPlay/>}</p>
//         <div className='durationflex'>
//           <p>0:0</p>
//           <input className='inputRange' type='range'onChange={handleDuartion}/>
//           <p>-21:00</p>
//         </div>
//         <p onClick={toggle2}>{!mute?<FaVolumeMute/>:<FaVolumeUp/>}</p>
//         <input max={1} min={0} step={0.01} type='range' value={volume} onChange={handleVolume}/>
//     </div>
//   )
// }

// export default AudioPlayer;
import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const AudioPlayer = ({ audiosrc, image }) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isplaying, setisplaying] = useState(true);
  const [mute, setMute] = useState(true);

  const audioRef = useRef();

  function handleDuration(e) {
    setDuration(audioRef.current.duration);
  }

  function handleVolume(e) {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  }

  function toggle() {
    setisplaying(!isplaying);
  }

  function toggleMute() {
    setMute(!mute);
  }

  useEffect(() => {
    if (isplaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isplaying]);

  useEffect(() => {
    if (mute) {
      audioRef.current.volume = 1;
      setVolume(1);
    } else {
      audioRef.current.volume = 0;
      setVolume(0);
    }
  }, [mute]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };
  
    const handleDuration = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };
  
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('loadedmetadata', handleDuration);
  
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleDuration);
      }
    };
  }, []);
  

  return (
    <div className="Custom-audio-palyer">
      <img className="custom-display-image" src={image} alt="album cover" />
      <audio ref={audioRef} src={audiosrc} />
      <p onClick={toggle}>{isplaying ? <FaPause /> : <FaPlay />}</p>
      <div className="durationflex">
        <p>{formatTime(currentTime)}</p>
        <input
          className="inputRange"
          type="range"
          onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
          value={currentTime}
          max={duration || 1}
        />
        <p>{formatTime(duration)}</p>
      </div>
      <p onClick={toggleMute}>{!mute ? <FaVolumeMute /> : <FaVolumeUp />}</p>
      <input
        max={1}
        min={0}
        step={0.01}
        type="range"
        value={volume}
        onChange={handleVolume}
      />
    </div>
  );
};

// Helper function to format time in MM:SS format
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default AudioPlayer;
