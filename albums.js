
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
    card.appendChild(body);
    col.appendChild(card);
    list.appendChild(col);
  });
};

document.addEventListener("DOMContentLoaded", function() {
  if (!document.getElementById("albumList")) return;

  const script = document.createElement("script");
  script.src = "https://api.deezer.com/chart/0/albums?limit=20&output=jsonp&callback=showTopAlbums";
  document.body.appendChild(script);
});