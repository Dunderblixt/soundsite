window.showSearchResults = function(response) {
  const results = response.data;
  console.log("Search Results:", results);

  const searchResults = document.getElementById("searchResults");
  if (!searchResults) return;
  searchResults.style.display = "block";
  searchResults.innerHTML = ""; // rensa gamla resultat

  const inner = document.createElement("div");
  inner.className = "container search-results-inner";

  // Skapa grid-rad
  const row = document.createElement("div");
  row.className = "row row-cols-1 row-cols-md-2 g-4";

  results.forEach(result => {
    // Kolumn-wrapper
    const col = document.createElement("div");
    col.className = "col";

    // Kort
    const card = document.createElement("div");
    card.className = "card text-bg-dark h-100";

    // Rad inuti kortet (bild till vänster, text till höger)
    const inner = document.createElement("div");
    inner.className = "row g-0";

    // Albumomslagsbild
    const imgCol = document.createElement("div");
    imgCol.className = "col-md-4";
    if (result.album && result.album.cover_medium) {
      const img = document.createElement("img");
      img.className = "img-fluid rounded-start h-100 object-fit-cover";
      img.src = result.album.cover_medium;
      img.alt = result.title;
      imgCol.appendChild(img);
    }

    // Textinnehåll
    const textCol = document.createElement("div");
    textCol.className = "col-md-8";

    const body = document.createElement("div");
    body.className = "card-body";

    // Låttitel
    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = result.title || result.name;
    body.appendChild(title);

    // Artistnamn
    const artist = document.createElement("p");
    artist.className = "card-text card-text-color mb-1";
    artist.textContent = result.artist && result.artist.name ? result.artist.name : "";
    body.appendChild(artist);

    // Albumtitel
    const album = document.createElement("p");
    album.className = "card-text card-text-color";
    const small = document.createElement("small");
    small.textContent = result.album && result.album.title ? result.album.title : "";
    album.appendChild(small);
    body.appendChild(album);

    textCol.appendChild(body);
    inner.appendChild(imgCol);
    inner.appendChild(textCol);
    card.appendChild(inner);
    col.appendChild(card);
    row.appendChild(col);
  });

  inner.appendChild(row);
  searchResults.appendChild(inner);
};

// Shared search logic
function performSearch(query) {
  if (!query) return;

  const heroSection = document.getElementById("heroSection");
  heroSection.classList.remove("d-flex");
  heroSection.classList.add("d-none");
  const script = document.createElement("script");
  script.src = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=20&output=jsonp&callback=showSearchResults`;
  document.body.appendChild(script);
}

// Event listener för hero-sökformuläret
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", function(e) {
  e.preventDefault();
  performSearch(document.getElementById("searchInput").value.trim());
});

// Event listener för navbar-sökformuläret
const navSearchForm = document.getElementById("navSearchForm");
navSearchForm.addEventListener("submit", function(e) {
  e.preventDefault();
  performSearch(document.getElementById("navSearchInput").value.trim());
});

// redirecta till sökresultat om det finns en query
const urlQuery = new URLSearchParams(window.location.search).get("q");
if (urlQuery) {
  performSearch(urlQuery);
}
