const clientId = 'd8f2c5237a8e490c9b5fc1b13188ba68';
const redirectUri = 'http://localhost:3000/';

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresInMatch) {
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  async Search(term) {
    const token = this.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },

  savePlaylist(name, trackUris){
    if(!name || !trackUris.length){
        return;
    }

    const accessToken = this.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers})
    .then(response => response.json())
    .then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
            headers,
            method: 'POST',
            body: JSON.stringify({name}),
        })
        .then(response => response.json())
        .then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(
                `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                {
                    headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris}),
                }
            );
        });
    });
  }
};

export default Spotify;
