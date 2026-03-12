// Callback global för JSONP – Deezer kommer att kalla denna funktion när data laddats
window.showTopCharts = function(response) {
  // Hämtar arrayen med top tracks från API-svaret
  const charts = response.data;

  const list = document.getElementById("chartList"); 
  if (!list) return; // stoppa om container inte finns
  list.innerHTML = ""; // rensa gamla kort

  // Loopa igenom varje track och skapa ett kort
  charts.forEach(item => {
    // Bootstrap grid column
    const col = document.createElement("div");
    col.className = "col"; // grid column

    //  Card
    const card = document.createElement("div");
    card.className = "card text-bg-dark h-100"; // samma som album/artist cards

    //  Track/Album bild
    if (item.album?.cover_medium) {
      const img = document.createElement("img");
      img.className = "card-img-top album-cover"; // återanvänder samma CSS som album
      img.src = item.album.cover_medium;
      img.alt = item.title; // alt-text = track titel
      card.appendChild(img);
    }

    //  Card body
    const body = document.createElement("div");
    body.className = "card-body";

    // Track titel
    const title = document.createElement("p");
    title.className = "card-text mb-0 fw-semibold"; 
    title.textContent = item.title; //  text till trackens namn
    body.appendChild(title);

    //  Artist namn
    const artist = document.createElement("p");
    artist.className = "card-text mb-0 card-text-color"; // samma styling som albums och artists
    artist.textContent = item.artist?.name || ""; // sätt artist namn eller tomt om ej tillgängligt
    body.appendChild(artist);

    card.appendChild(body);
    col.appendChild(card);
    list.appendChild(col);
  });
};

document.addEventListener("DOMContentLoaded", function() {
  if (!document.getElementById("chartList")) return;

  const script = document.createElement("script");
  script.src = "https://api.deezer.com/chart/0/tracks?limit=20&output=jsonp&callback=showTopCharts";
  document.body.appendChild(script);
});