// Callback global för JSONP – Deezer kommer att kalla denna funktion när data laddats
window.showTopCharts = function(response) {
  const charts = response.data;

  const list = document.getElementById("chartList"); 
  if (!list) return; 
  list.innerHTML = ""; 

  charts.forEach(item => {
    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = "card text-bg-dark h-100";

    if (item.album?.cover_medium) {
      const img = document.createElement("img");
      img.className = "card-img-top album-cover"; 
      img.src = item.album.cover_medium;
      img.alt = item.title;
      card.appendChild(img);
    }

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("p");
    title.className = "card-text mb-0 fw-semibold"; 
    title.textContent = item.title;
    body.appendChild(title);

    const artist = document.createElement("p");
    artist.className = "card-text mb-0 card-text-color";
    artist.textContent = item.artist?.name || "";

    card.appendChild(body);
    col.appendChild(card);
    list.appendChild(col);
  });

  window.animateCards?.(list);
};

// Kör koden när hela HTML-sidan har laddats
document.addEventListener("DOMContentLoaded", function() {
  if (!document.getElementById("chartList")) return;

  const script = document.createElement("script");
  // Använder JSONP för att hämta data och skicka den till showTopCharts
  script.src = "https://api.deezer.com/chart/0/tracks?limit=20&output=jsonp&callback=showTopCharts"; 
  document.body.appendChild(script);
});
