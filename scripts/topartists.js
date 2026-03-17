// Global callback-funktion för JSONP som körs när API:t skickar tillbaka top artist-data.
window.showArtists = function (response) {
  const artists = response.data;

  const list = document.getElementById("artistList");
  if (!list) return;
  list.innerHTML = "";

  artists.forEach((artist) => {
    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = "card text-bg-dark h-100";

    if (artist.picture_medium) {
      const img = document.createElement("img");
      img.src = artist.picture_medium;
      img.alt = artist.name;
      img.className = "card-img-top album-cover";
      card.appendChild(img);
    }

    const body = document.createElement("div");
    body.className = "card-body";

    const name = document.createElement("p");
    name.className = "card-text mb-0 fw-semibold";
    name.textContent = artist.name;
    body.appendChild(name);

    card.appendChild(body);
    col.appendChild(card);
    list.appendChild(col);
  });

  window.animateCards?.(list);
};

// Kör koden när hela HTML-sidan har laddats
document.addEventListener("DOMContentLoaded", function () {
  if (!document.getElementById("artistList")) return;

  // script.src Använder JSONP för att hämta data och skicka den till showArtist
  const script = document.createElement("script");
  script.src =
    "https://api.deezer.com/chart/0/artists?limit=20&output=jsonp&callback=showArtists";
  document.body.appendChild(script);
});
