import { useState } from "react";
import tracksList from "../../assets/tracksList.js";
import style from "./MainPage.module.scss";
import Track from "../../components/Track/Track.jsx";
import { Input } from "@mui/material";

const startSearch = (query) => {
    if(!query) return tracksList;
    const lowerCaseQuery = query.toLowerCase();
    return tracksList.filter(
        (track) => 
            track.title.toLowerCase().includes(lowerCaseQuery) ||
            track.artists.toLowerCase().includes(lowerCaseQuery)
        );
};

const MainPage = () => {
    const [tracks, setTracks] = useState(tracksList);
    const handleChange = (event) => {
        const foundTracks = startSearch(event.target.value);
        setTracks(foundTracks);
    };

    return <div className={style.search}>
        <Input className={style.input} placeholder="Search..." onChange={handleChange}/>
        <div className={style.list}>
            {tracks.map((track) => (
                <Track key={track.id} {...track}/>
            ))}
        </div>
    </div>;
};

export default MainPage;