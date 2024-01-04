import { useContext } from "react";
import { AudioContext } from "../../context/AudioContext";
import style from "./track.module.scss";
import DurationConvert from "../../utils/DurationConvert";
import { IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import cn from "classnames";

const Track = (track) => {
    const { id, src, preview, title, artists, duration } = track;
    const { handleToggleAudio, currentTrack, isPlaying } = useContext(AudioContext);
    const isCurrentTrack = currentTrack.id === track.id;
    const formattedDuration = DurationConvert(duration);
    return <div className={ cn(style.track, isCurrentTrack && style.playing) }>
        <IconButton onClick={ () => handleToggleAudio(track) }>
            { isCurrentTrack && isPlaying ? <Pause/> : <PlayArrow/> }
        </IconButton>
        <img className={style.preview} src={preview}/>
        <div className={style.credits}>
            <b>{title}</b>
            <p>{artists}</p>
        </div>
        <p>{formattedDuration}</p>
    </div>;
}

export default Track;