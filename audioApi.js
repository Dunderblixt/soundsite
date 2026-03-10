//
const myTopURL = 'https://api.spotify.com/v1/me/top/artists';
const searchURL = 'https://api.spotify.com/v1/search?';

const query = this.querySelector('input[type="text"]').value
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
let token = accessToken;
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`${myTopURL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=20', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);