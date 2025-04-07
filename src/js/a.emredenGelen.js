// import axios from "axios";
// let apiKey = "6c6ff1eefb34466f1e524e319f306b8f";
// let url = "https://api.themoviedb.org/3";
// Create popup elements
function createPopupElements() {
  // Check if popup already exists
  if (document.querySelector(".movie-popup-overlay")) {
    return; // Already created
  }
  console.log("Creating popup elements");
  // Create overlay
  const overlay = document.createElement("div");
  overlay.classList.add("movie-popup-overlay");
  // Create popup
  const popup = document.createElement("div");
  popup.classList.add("movie-popup");
  // Create close button
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("popup-close");
  closeBtn.innerHTML = "×";
  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
  });
  // Create content container
  const content = document.createElement("div");
  content.classList.add("popup-content");
  // Append elements
  popup.appendChild(closeBtn);
  popup.appendChild(content);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
  // Add styles
  const style = document.createElement("style");
  style.textContent = `
    .movie-popup-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 1000;
      justify-content: center;
      align-items: center;
    }
    .movie-popup {
      background-color: #1A1A1A;
      width: 80%;
      max-width: 800px;
      max-height: 90vh;
      overflow-y: auto;
      border-radius: 12px;
      padding: 24px;
      position: relative;
      color: white;
    }
    .popup-close {
      position: absolute;
      top: 12px;
      right: 12px;
      font-size: 28px;
      border: none;
      background: transparent;
      color: white;
      cursor: pointer;
    }
    .popup-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .popup-movie-details {
      display: flex;
      gap: 24px;
    }
    @media (max-width: 768px) {
      .popup-movie-details {
        flex-direction: column;
      }
    }
  `;
  document.head.appendChild(style);
  // Close popup when clicking on overlay
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.style.display = "none";
    }
  });
}
// Show movie details in popup
function showMoviePopup(movie) {
  console.log("Opening popup for movie:", movie.title);
  // Make sure popup elements exist
  createPopupElements();
  const overlay = document.querySelector(".movie-popup-overlay");
  const content = document.querySelector(".popup-content");
  if (!overlay || !content) {
    console.error("Popup elements not found!");
    return;
  }
  // Show basic info immediately
  content.innerHTML = `
    <div class="popup-movie-details">
      <div class="popup-image">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
    movie.title
  }" style="width: 280px; border-radius: 8px;">
      </div>
      <div class="popup-info">
        <h2>${movie.title}</h2>
        <p><strong>Puan:</strong> ${movie.vote_average} (${
    movie.vote_count
  } oy)</p>
        <p><strong>Yayın Tarihi:</strong> ${
          movie.release_date || "Bilinmiyor"
        }</p>
        <p><strong>Türler:</strong> ${getGenres(movie.genre_ids).join(", ")}</p>
        <p><strong>Özet:</strong> ${movie.overview || "Özet bulunmuyor."}</p>
        <p>Daha fazla bilgi yükleniyor...</p>
      </div>
    </div>
  `;
  // Display the popup immediately
  overlay.style.display = "flex";
  // Get additional movie details if available
  if (movie.id) {
    console.log(`Fetching details for movie ID: ${movie.id}`);
    axios
      .get(`${url}/movie/${movie.id}?api_key=${apiKey}&language=tr-TR`)
      .then((response) => {
        console.log("Got detailed movie data:", response.data);
        const movieDetails = response.data;
        content.innerHTML = `
          <div class="popup-movie-details">
            <div class="popup-image">
              <img src="https://image.tmdb.org/t/p/w500${
                movie.poster_path
              }" alt="${movie.title}" style="width: 280px; border-radius: 8px;">
            </div>
            <div class="popup-info">
              <h2>${movie.title}</h2>
              <p><strong>Orijinal Başlık:</strong> ${
                movieDetails.original_title
              }</p>
              <p><strong>Puan:</strong> ${movie.vote_average} (${
          movie.vote_count
        } oy)</p>
              <p><strong>Yayın Tarihi:</strong> ${
                movie.release_date || "Bilinmiyor"
              }</p>
              <p><strong>Türler:</strong> ${getGenres(movie.genre_ids).join(
                ", "
              )}</p>
              <p><strong>Özet:</strong> ${
                movie.overview || "Özet bulunmuyor."
              }</p>
              ${
                movieDetails.runtime
                  ? `<p><strong>Süre:</strong> ${movieDetails.runtime} dakika</p>`
                  : ""
              }
            </div>
          </div>
        `;
      })
      .catch((error) => {
        console.error("Film detayları alınırken hata:", error);
      });
  }
}
// Modify the function that creates movie cards to add click listeners
function createMovieCard(movie, container) {
  console.log("Creating movie card for:", movie.title);
  let movieDiv = document.createElement("div");
  movieDiv.classList.add("movie-card");
  movieDiv.innerHTML = `
    <div class="image-container">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
    movie.title
  }" width="280" height="406">
    </div>
    <div class="movie-details">
    <div class="movie-name">
     <h3>${movie.title}</h3>
        <p>${getGenres(movie.genre_ids).join(", ")}</p></div>
        <div class="stars">
            ${getStars(movie.vote_average)}
        </div>
    </div>
  `;
  // Add click event listener to open popup
  movieDiv.addEventListener("click", () => {
    console.log("Movie card clicked:", movie.title);
    showMoviePopup(movie);
  });
  container.appendChild(movieDiv);
}
// Sayfa yüklendiğinde popüler filmleri al
axios
  .get(`${url}/movie/popular?api_key=${apiKey}&language=tr-TR`)
  .then((response) => {
    console.log("Veri:", response.data);
    let movies = response.data.results;
    if (movies.length > 0) {
      let img = document.querySelector(".img");
      let movie = movies[0];
      createMovieCard(movie, img);
    }
  });
// "See all" butonuna tıklama işlemi
let seeAll = document.querySelector(".see");
console.log(seeAll);
seeAll.addEventListener("click", () => {
  let img = document.querySelector(".img");
  img.innerHTML = "";
  let weekly = document.querySelector(".weekly-see");
  weekly.style.display = "none";
  let filmDate = document.createElement("div");
  filmDate.classList.add("film-date");
  let filmInput = document.createElement("input");
  let date = document.createElement("input");
  filmInput.type = "text";
  filmInput.placeholder = "Film Adı";
  filmInput.classList.add("film-input");
  filmInput.style.width = "173px";
  filmInput.style.height = "40px";
  filmInput.style.border = "1px solid #FFFFFF";
  filmInput.style.borderRadius = "8px";
  filmInput.style.marginBottom = "12px";
  filmInput.style.padding = "1px";
  filmInput.style.backgroundColor = "transparent";
  filmInput.style.marginRight = "10px";
  filmInput.style.color = "#FFFFFF";
  date.type = "date";
  date.classList.add("date");
  date.style.width = "95px";
  date.style.height = "40px";
  date.style.border = "1px solid #FFFFFF";
  date.style.borderRadius = "8px";
  date.style.marginBottom = "12px";
  date.style.padding = "1px";
  date.style.backgroundColor = "transparent";
  date.style.color = "#FFFFFF";
  date.addEventListener("click", function () {
    this.showPicker(); // Tarayıcı destekliyorsa, tarih seçici açılır
  });
  img.appendChild(filmDate);
  filmDate.appendChild(filmInput);
  filmDate.appendChild(date);
  let searchDiv = document.createElement("div");
  searchDiv.classList.add("search-container");
  let input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Search";
  input.classList.add("search-input");
  input.style.width = "224px";
  input.style.height = "40px";
  input.style.border = "1px solid #FFFFFF";
  input.style.borderRadius = "8px";
  input.style.marginBottom = "20px";
  input.style.padding = "1px";
  input.style.backgroundColor = "transparent";
  input.style.color = "#FFFFFF";
  let searchButton = document.createElement("img");
  searchButton.src = "../img/Icon button.svg";
  searchButton.alt = "Search Button";
  searchButton.classList.add("search-button");
  searchButton.style.width = "40px";
  searchButton.style.height = "40px";
  searchButton.style.marginLeft = "10px";
  searchButton.style.cursor = "pointer";
  searchButton.style.borderRadius = "8px";
  searchButton.style.backgroundColor = "transparent";
  searchButton.style.color = "#FFFFFF";
  img.appendChild(searchDiv);
  searchDiv.appendChild(input);
  searchDiv.appendChild(searchButton);
  axios
    .get(`${url}/movie/popular?api_key=${apiKey}&language=tr-TR`)
    .then((response) => {
      console.log("Veri:", response.data);
      let movies = response.data.results;
      let img = document.querySelector(".img");
      movies.forEach((movie) => {
        createMovieCard(movie, img);
      });
    })
    .catch((error) => {
      console.error("Hata:", error);
    });
});
// Yıldızları oluşturmak için fonksiyon
function getStars(voteAverage) {
  let stars = "";
  let fullStars = Math.floor(voteAverage / 2); // 1-10 arasında olduğu için 2 ile bölüyoruz
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars += `<span class="fa fa-star checked"></span>`;
    } else {
      stars += `<span class="fa fa-star"></span>`;
    }
  }
  return stars;
}
// Türleri almak için (Türler film API'sinde ID ile gelir)
function getGenres(genreIds) {
  const genresList = [
    { id: 28, name: "Aksiyon" },
    { id: 12, name: "Macera" },
    { id: 16, name: "Animasyon" },
    { id: 35, name: "Komedi" },
    { id: 80, name: "Suç" },
    { id: 99, name: "Belgesel" },
    { id: 18, name: "Dram" },
    { id: 10751, name: "Aile" },
    { id: 14, name: "Fantastik" },
    { id: 36, name: "Tarih" },
    { id: 27, name: "Korku" },
    { id: 10402, name: "Müzik" },
    { id: 9648, name: "Gizem" },
    { id: 10749, name: "Romantik" },
    { id: 878, name: "Bilim Kurgu" },
    { id: 10770, name: "Televizyon" },
    { id: 53, name: "Gerilim" },
    { id: 10752, name: "Savaş" },
    { id: 37, name: "Western" },
  ];
  return genreIds.map((id) => {
    const genre = genresList.find((g) => g.id === id);
    return genre ? genre.name : "Bilinmiyor";
  });
}
// Initialize popup elements immediately
createPopupElements();
