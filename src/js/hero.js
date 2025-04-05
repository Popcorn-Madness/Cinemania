import axios from "axios";

let apiKey = "4b2d98cfefe5ff87d0b9e4101af4007f";
let url = "https://api.themoviedb.org/3";

// Sayfa yüklendiğinde popüler filmleri al
axios
  .get(`${url}/movie/popular?api_key=${apiKey}&language=tr-TR`)
  .then((response) => {
    console.log("Veri:", response.data);
    // Filmleri işleme fonksiyonuna gönder
    displayPopularMovies(response.data.results);
  })
  .catch((error) => {
    console.error("Hata oluştu:", error);
    alert("Filmleri yüklerken bir sorun oluştu. Lütfen tekrar deneyin.");
  });

// Popüler filmleri ekrana göster
function displayPopularMovies(movies) {
  const moviesContainer = document.getElementById("hero-section");
  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>Puan: ${movie.vote_average}</p>
      <button onclick="showDetails(${movie.id})">Detaylar</button>
    `;
    moviesContainer.appendChild(movieElement);
  });
}

// Detayları gösterme placeholder fonksiyonu
function showDetails(movieId) {
  alert(`Film ID'si: ${movieId} - Detaylar burada gösterilecek.`);
}


 
axios
  .get(`${url}/movie/popular?api_key=${apiKey}&language=tr-TR`)
  .then((response) => {
    console.log("Veri:", response.data);
    let movies = response.data.results;
    if (movies.length > 0) {
      let img = document.querySelector(".img");

      let movie = movies[0];
      let movieDiv = document.createElement("div");
movieDiv.classList.add("movie-card");
movieDiv.innerHTML = `
  <div class="image-container">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" width="280" height="406">
  </div>
  <div class="movie-details">
      <div class="movie-name">
          <h3>${movie.title}</h3>
        
      </div>
      <div class="stars">
          ${getStars(movie.vote_average)}
      </div>
  </div>
  <div class="button-container">
      <button id="details-btn">Watch trailer</button>
      <button id="trailer-btn">More details</button>
  </div>
`;
img.appendChild(movieDiv);

    }
  });

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