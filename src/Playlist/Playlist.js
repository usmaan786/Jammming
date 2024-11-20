import React from "react";
import TrackList from "../TrackList/TrackList";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Playlist.css';

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
            <button onClick={handleSubmit}>Save To Spotify</button>
            <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true}/>
            
        </div>
    );
};

export default Playlist;