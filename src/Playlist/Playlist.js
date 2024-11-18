import React from "react";
import TrackList from "../TrackList/TrackList";

const Playlist = ({playlistName, playlistTracks, onNameChange, onRemove, savePlaylist}) =>{
    const handleNameChange = (event) =>{
        onNameChange(event.target.value)
    }

    const handleSubmit = (event) =>{
        console.log('Saving Playlist...');
        savePlaylist();
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
            <button className="Playlist-save" onClick={handleSubmit}>Save To Spotify</button>
        </div>
    );
};

export default Playlist;