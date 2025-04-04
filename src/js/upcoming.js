import axios from "axios";

let apiKey = "6c6ff1eefb34466f1e524e319f306b8f";
let url = "https://api.themoviedb.org/3";

// Sayfa yüklendiğinde popüler filmleri al
axios
  .get(`${url}/movie/popular?api_key=${apiKey}&language=tr-TR`)
  .then((response) => {
    console.log("Veri:", response.data);
        let movies = response.data.results;
      if (movies.length > 0) {
        let img = document.querySelector(".img");
        let filmismi = document.querySelector(".film-ismi");
        let movie = movies[0];
        let movieDiv = document.createElement("div");
      movieDiv.classList.add("movie-card");
      movieDiv.innerHTML = `
         <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
         movie.title
       } " width="280" height="406">
         <div class="movie-details">
           <h3>${movie.title}</h3>
           <p>${movie.genre_ids.join(", ")}</p>
           <div class="stars">
             ${getStars(movie.vote_average)}
           </div>
         </div>
       `;
       img.appendChild(movieDiv);
       filmismi.innerHTML = `<h2>${movie.title}</h2>`;
     }
  });
