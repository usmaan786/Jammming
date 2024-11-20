import logo from './logo.svg';
import './App.css';
import TrackList from './TrackList/TrackList';
import Playlist from './Playlist/Playlist';
import React, {useState} from 'react';
import SearchBar from './SearchBar/SearchBar';
import Spotify from './utils/Spotify';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const[playlistTracks, setPlaylistTracks] = useState([]);
  const[searchResults, setSearchResults] = useState([]);

  const searchSpotify = async(term) => {
    const tracks = await Spotify.Search(term);
    setSearchResults(tracks);
  }

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

  const savePlaylist = () => {
    const trackUris = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
    });
  };

  return (
    <div className="App">
      {/* Header Section */}
      <header className="text-center py-3 text-light bg-dark">
        <h1>Jammming</h1>
      </header>

      {/* Content Section */}
      <div className="container-fluid bg-dark text-light" style={{ height: '100vh' }}>
        <div className="row pt-5 justify-content-center">
          {/* Search Section */}
          <div className="col-md-5 d-flex flex-column align-items-center">
            <SearchBar searchSpotify={searchSpotify} />
            <TrackList tracks={searchResults} onAdd={handlePlaylistUpdate} isRemoval={false} />
          </div>

          {/* Playlist Section */}
          <div className="col-md-5 d-flex flex-column align-items-center">
            <Playlist
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onNameChange={handlePlaylistNameChange}
              onRemove={handlePlaylistRemove}
              savePlaylist={savePlaylist}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
