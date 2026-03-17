
// Global callback-funktion för JSONP som körs när API:t skickar tillbaka top albums-data. 
window.showTopAlbums = function(response) {
  const albums = response.data;
  
  const list = document.getElementById("albumList");
  if (!list) return;
  list.innerHTML = ""; 

  // Skapar albumkort 
  albums.forEach(album => {
    const col = document.createElement("div");
    col.className = "col"; 
    const card = document.createElement("div"); 
    card.className = "card text-bg-dark h-100";

    if (album.cover_xl) {
      const img = document.createElement("img");
      img.className = "card-img-top album-cover";
      img.src = album.cover_medium;
      img.alt = album.title;
      card.appendChild(img);
    }
    
    const body = document.createElement("div");
    body.className = "card-body";

    const name = document.createElement("p");
    name.className = "card-text mb-0 fw-semibold";
    name.textContent = album.title;
    body.appendChild(name);

    const artistName = document.createElement("p");
    artistName.className = "card-text mb-0 card-text-color"; 
    artistName.textContent = album.artist && album.artist.name ? album.artist.name : "";
    body.appendChild(artistName);
    card.appendChild(body);
    col.appendChild(card);
    list.appendChild(col);
  });

  window.animateCards?.(list);
};

// Kör koden när hela HTML-sidan har laddats
document.addEventListener("DOMContentLoaded", function() {
  if (!document.getElementById("albumList")) return;

  // script.src Använder JSONP för att hämta data och skicka den till showTopAlbums
  const script = document.createElement("script");
  script.src = "https://api.deezer.com/chart/0/albums?limit=20&output=jsonp&callback=showTopAlbums";
  document.body.appendChild(script);
});
