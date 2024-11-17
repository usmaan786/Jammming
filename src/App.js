import logo from './logo.svg';
import './App.css';
import TrackList from './TrackList/TrackList';
import Playlist from './Playlist/Playlist';
import React, {useState} from 'react';

function App() {

  const[playlistTracks, setPlaylistTracks] = useState([]);
  const handlePlaylistUpdate = (track) =>{
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    setPlaylistTracks([...playlistTracks, track]);
  };

  const handlePlaylistRemove = (track) =>{
    setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id));
  };


  const[playlistName, setPlaylistName] = useState('New Playlist');
  const handlePlaylistNameChange = (newName) =>{
    setPlaylistName(newName);
  };

  const mockTracks = [
    { id: 1, name: 'Track One', artist: 'Artist A', album: 'Album X' },
    { id: 2, name: 'Track Two', artist: 'Artist B', album: 'Album Y' },
    { id: 3, name: 'Track Three', artist: 'Artist C', album: 'Album Z' },
    ];

  return (
    <div className="App">
      <h1>Jammming</h1>
      <TrackList tracks={mockTracks} onAdd={handlePlaylistUpdate} />
      <div>
        <Playlist 
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onNameChange={handlePlaylistNameChange}
          onRemove={handlePlaylistRemove}
          />
      </div>
    </div>
  );
}

export default App;
