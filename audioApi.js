//  Callback måste vara global för JSONP
window.showArtists = function(response) {
  const artists = response.data;
  console.log("Top 20 Artists:", artists);

  const list = document.getElementById("artistList");
  if (!list) return;
  list.innerHTML = ""; // rensa gamla kort

  artists.forEach(artist => {
    // Kort
    const card = document.createElement("div");

    // Namn
    const name = document.createElement("h3");
    name.textContent = artist.name;
    card.appendChild(name);

    // Bild (medium)
    if (artist.picture_medium) {
      const img = document.createElement("img");
      img.src = artist.picture_medium;
      img.alt = artist.name;
      card.appendChild(img);
    }

    list.appendChild(card);
  });
};


// Knappen som hämtar Top 20 Artists
const topArtistsBtn = document.getElementById("topArtistsBtn");
topArtistsBtn.addEventListener("click", function(e) {
  e.preventDefault(); // hindra  från att scrolla upp efter klick

  //  Skapa script som hämtar JSONP från Deezer Api
  const script = document.createElement("script");
  script.src = "https://api.deezer.com/chart/0/artists?limit=20&output=jsonp&callback=showArtists";
  document.body.appendChild(script);
});



// Callback global för JSONP
window.showTopAlbums = function(response) {
  const albums = response.data;
  console.log("Top 20 Albums:", albums);

  // Hitta id från HTML
  const list = document.getElementById("albumList");
  if (!list) return;
  list.innerHTML = ""; 

  // Skapar albumkort 
  albums.forEach(album => {
    const card = document.createElement("div");

    // Album namn
    const name = document.createElement("h3");
    name.textContent = album.title;
    card.appendChild(name);

    // Album bild (medium)
    if (album.cover_medium) {
      const img = document.createElement("img");
      img.src = album.cover_medium;
      img.alt = album.title;
      card.appendChild(img);
    }


    // Artist namn
    if (album.artist && album.artist.name) {
      const artistName = document.createElement("p");
      artistName.textContent = `Artist: ${album.artist.name}`;
      card.appendChild(artistName);
    }

    list.appendChild(card);
  });
};

// Eventlistener för knappen top50Btn
const top50Btn = document.getElementById("top50Btn");
top50Btn.addEventListener("click", function(e) {
  e.preventDefault();
  console.log("Top 20 Albums knapp klickad");

  
  const script = document.createElement("script");
  script.src = "https://api.deezer.com/chart/0/albums?limit=20&output=jsonp&callback=showTopAlbums";
  document.body.appendChild(script);
});