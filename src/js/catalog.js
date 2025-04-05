import axios from "axios";

export function catalogFun() {
  let apiKey = "6c6ff1eefb34466f1e524e319f306b8f";
  let url = "https://api.themoviedb.org/3";

  window.onload = function () {
    let catalog = document.querySelector(".catalog");
    catalog.innerHTML = "";

    let filmDate = document.createElement("div");
    filmDate.classList.add("film-date");

    let filmİnput = document.createElement("input");

    filmİnput.type = "text";
    filmİnput.placeholder = "Film";
    filmİnput.classList.add("film-input");
    filmİnput.style.width = "173px";
    filmİnput.style.height = "40px";
    filmİnput.style.border = "1px solid #FFFFFF";
    filmİnput.style.borderRadius = "8px";
    filmİnput.style.marginBottom = "12px";
    filmİnput.style.padding = "1px";
    filmİnput.style.backgroundColor = "transparent";
    filmİnput.style.marginRight = "10px";
    filmİnput.style.color = "#FFFFFF";

    let date = document.createElement("select");
    date.classList.add("date");
    date.style.width = "95px";
    date.style.height = "40px";
    date.style.border = "1px solid #ffffff";
    date.style.borderRadius = "8px";
    date.style.marginBottom = "12px";
    date.style.padding = "1px";
    date.style.backgroundColor = "transparent";
    date.style.color = "#ffffff";

    for (let year = 2023; year >= 2015; year--) {
      let option = document.createElement("option");
      option.value = year;
      option.text = year;
      if (year === 2019) {
        option.selected = true;
      }
      date.appendChild(option);
    }

    catalog.appendChild(filmDate);
    filmDate.appendChild(filmİnput);
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

    catalog.appendChild(searchDiv);
    searchDiv.appendChild(input);
    searchDiv.appendChild(searchButton);

    axios
      .get(`${url}/movie/popular?api_key=${apiKey}&language=tr-TR`)
      .then((response) => {
        console.log("Veri:", response.data);
        let movies = response.data.results;
        let catalog = document.querySelector(".catalog");

        movies.forEach((movie) => {
          let movieDiv = document.createElement("div");
          movieDiv.classList.add("movie-card");
          movieDiv.innerHTML = `
        <div class="image-container">
            <img src="https://image.tmdb.org/t/p/w500${
              movie.poster_path
            }" alt="${movie.title}" width="280" height="406">
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
          catalog.appendChild(movieDiv);
        });
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  };

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
}
