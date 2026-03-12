window.showArtists = function(response) {
  const artists = response.data;
  console.log("Top 20 Artists:", artists);

  const list = document.getElementById("artistList");
  if (!list) return;
  list.innerHTML = ""; // rensa gamla kort

  artists.forEach(artist => {
    // Bootstrap col div
    const col = document.createElement("div");
    col.className = "col"; // grid column

    // Card
    const card = document.createElement("div");
    card.className = "card text-bg-dark h-100";

    // Artistbild
    if (artist.picture_medium) {
      const img = document.createElement("img");
      img.src = artist.picture_medium;
      img.alt = artist.name;
      img.className = "card-img-top album-cover"; // samma klass som album
      card.appendChild(img);
    }

    // Card body
    const body = document.createElement("div");
    body.className = "card-body";

    // Artist namn
    const name = document.createElement("p");
    name.className = "card-text mb-0 fw-semibold"; // samma som album namn
    name.textContent = artist.name;
    body.appendChild(name);

    card.appendChild(body);
    col.appendChild(card);
    list.appendChild(col);
  });
};

document.addEventListener("DOMContentLoaded", function() {
  if (!document.getElementById("artistList")) return;

  const script = document.createElement("script");
  script.src = "https://api.deezer.com/chart/0/artists?limit=20&output=jsonp&callback=showArtists";
  document.body.appendChild(script);
});
