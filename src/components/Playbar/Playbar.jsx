import { useContext, useState, useEffect } from 'react';
import { AudioContext } from '../../context/AudioContext';
import { Slider, IconButton } from '@mui/material';
import { PlayArrow, Pause } from "@mui/icons-material";
import DurationConvert from '../../utils/DurationConvert';
import style from "./Playbar.module.scss"

const TimeControls = () => {
    const { audio, currentTrack } = useContext(AudioContext);
  
    const { duration } = currentTrack;
  
    const [currentTime, setCurrentTime] = useState(0);
  
    const formattedCurrentTime = DurationConvert(currentTime);
  
    const sliderCurrentTime = Math.round((currentTime / duration) * 100);
  
    const handleChangeCurrentTime = (_, value) => {
      const time = Math.round((value / 100) * duration);
  
      setCurrentTime(time);
      audio.currentTime = time;
    };
  
    useEffect(() => {
      const timeInterval = setInterval(() => {
        setCurrentTime(audio.currentTime);
      }, 1000);
  
      return () => {
        clearInterval(timeInterval);
      };
    }, []);
  
    return (
      <>
        <p>{formattedCurrentTime}</p>
        <Slider
          step={1}
          min={0}
          max={100}
          value={sliderCurrentTime}
          onChange={handleChangeCurrentTime}
        />
      </>
    );
  };
  
  const Playbar = () => {
    const { currentTrack, handleToggleAudio, isPlaying } =
      useContext(AudioContext);
  
    const { title, artists, preview, duration } = currentTrack;
  
    const formattedDuration = DurationConvert(duration);
  
    return (
      <div className={style.playbar}>
        <img className={style.preview} src={preview} alt="" />
        <IconButton onClick={() => handleToggleAudio(currentTrack)}>
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        <div className={style.credits}>
          <h4>{title}</h4>
          <p>{artists}</p>
        </div>
        <div className={style.slider}>
          <TimeControls />
          <p>{formattedDuration}</p>
        </div>
      </div>
    );
  };

export default Playbar;