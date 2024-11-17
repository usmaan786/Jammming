import React from "react";
import TrackList from "../TrackList/TrackList";

const Playlist = ({playlistName, playlistTracks, onNameChange, onRemove}) =>{
    const handleNameChange = (event) =>{
        onNameChange(event.target.value)
    }

    return(
        <div className="Playlist">
            <input
                type="text"
                value={playlistName}
                onChange={handleNameChange}
                placeholder="Playlist"
                />
            <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true}/>
            <button className="Playlist-save">Save To Spotify</button>
        </div>
    );
};

export default Playlist