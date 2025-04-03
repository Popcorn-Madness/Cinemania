// Axios'u import etme (npm ile kurduysanız)
import axios from "axios";

let apiKey = "6c6ff1eefb34466f1e524e319f306b8f";
let url = "https://api.themoviedb.org/3";

// Axios ile API'den veri çekme

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
      movieDiv.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" width="280" height="406">`;
      img.appendChild(movieDiv);
    }
  });

// axios
//   .get(`${url}/movie/popular?api_key=${apiKey}&language=tr-TR`)
//   .then((response) => {
//     console.log("Veri:", response.data);
//     let movies = response.data.results;
//     let img = document.querySelector(".img");
//     movies.forEach((movie) => {
//       let movieDiv = document.createElement("div");
//       movieDiv.classList.add("movie-card");
//       movieDiv.innerHTML = `
//       <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" width="280" height="406">
//                 `;
//       img.appendChild(movieDiv);
//     });
//   })
//   .catch((error) => {
//     console.error("Hata:", error);
//   });
