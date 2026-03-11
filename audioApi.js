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
    // skapar div och anger classnamn för grid struktur
    const col = document.createElement("div");
    col.className = "col"; 
    // skapar kort
    const card = document.createElement("div"); 
    card.className = "card text-bg-dark h-100";

    // Album bild (medium) FINNS DET STÖRRE I API:ET?
    if (album.cover_medium) {
      const img = document.createElement("img");
      // tillämpar bootstrap styling
      img.className = "card-img-top album-cover";
      img.src = album.cover_medium;
      img.alt = album.title;
      card.appendChild(img);
    }
    
    const body = document.createElement("div");
    body.className = "card-body";

    // Album namn
    const name = document.createElement("p");
    // tillämpar styling via bootstrap
    name.className = "card-text mb-0 fw-semibold";
    // byter text innehåll till API data
    name.textContent = album.title;
    body.appendChild(name);

    // Artist namn - bytte bort if statement pga data kommer returnera ett namn
    const artistName = document.createElement("p");
    // tillämpar styling via bootstrap
    artistName.className = "card-text mb-0 card-text-color"; 
    // byter textinnehåll till API datan
    artistName.textContent = album.artist && album.artist.name ? album.artist.name : "";
    body.appendChild(artistName);
    // * appendar till parents
    card.appendChild(body);
    col.appendChild(card);
    list.appendChild(col);
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
