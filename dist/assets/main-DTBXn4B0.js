import{a as f}from"./vendor-C19taMLP.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const L="6c6ff1eefb34466f1e524e319f306b8f",E="https://api.themoviedb.org/3";function k(){if(console.log("Initializing popup functionality"),B(),!document.getElementById("movie-popup-container")){const n=document.createElement("div");n.id="movie-popup-container",n.style.display="none",n.style.position="fixed",n.style.zIndex="9999",n.style.left="0",n.style.top="0",n.style.width="100%",n.style.height="100%",n.style.backgroundColor="rgba(0, 0, 0, 0.8)",n.style.overflow="auto",document.body.appendChild(n),console.log("Popup container created")}document.addEventListener("click",function(n){const e=n.target.closest(".movie-card");if(e){const t=e.dataset.movieId;t?(console.log("Movie card clicked, ID:",t),I(t)):console.log("Movie card clicked but no movieId found")}}),document.addEventListener("keydown",function(n){if(n.key==="Escape"){const e=document.getElementById("movie-popup-container");e&&e.style.display==="block"&&(console.log("ESC key pressed, closing popup"),e.style.display="none")}}),console.log("Event delegation set up for movie cards")}function B(){if(!document.getElementById("movie-popup-styles")){const n=document.createElement("style");n.id="movie-popup-styles",n.textContent=`
      #movie-popup-container {
        display: none;
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        overflow: auto;
        padding: 0;
        margin: 0;
      }
      
      .movie-popup {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        max-width: 800px;
        max-height: 80vh;
        background-color: #222;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(248, 119, 25, 0.3);
        overflow: auto;
      }
      
      .popup-content {
        padding: 20px;
        display: flex;
        flex-direction: column;
        position: relative;
      }
      
      .close-popup {
        color: #aaa;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        position: absolute;
        right: 15px;
        top: 10px;
        z-index: 10000;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
      
      .close-popup:hover {
        color: #f87719;
      }
      
      .popup-image {
        text-align: center;
        margin-bottom: 20px;
      }
      
      .popup-image img {
        max-width: 100%;
        max-height: 350px;
        border-radius: 8px;
        object-fit: contain;
      }
      
      .popup-details h2 {
        color: #f87719;
        margin-bottom: 10px;
      }
      
      .release-date, .rating, .genres {
        color: #ccc;
        margin-bottom: 8px;
      }
      
      .overview {
        margin-top: 15px;
      }
      
      .overview h3 {
        color: #fff;
        margin-bottom: 8px;
      }
      
      @media (min-width: 768px) {
        .popup-content {
          flex-direction: row;
        }
        
        .popup-image {
          flex: 0 0 40%;
          margin-right: 20px;
          margin-bottom: 0;
        }
        
        .popup-details {
          flex: 1;
        }
      }
    `,document.head.appendChild(n),console.log("Added popup styles directly")}}async function I(n){console.log("Showing popup for movie ID:",n);try{const e=document.getElementById("movie-popup-container");if(!e){console.error("Popup container not found");return}e.innerHTML='<div class="movie-popup" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:90%;max-width:800px;background-color:#222;border-radius:10px;"><div class="popup-content" style="padding:20px;"><p style="color:white;text-align:center;">Loading...</p></div></div>',e.style.display="block",console.log(`Fetching movie data from: ${E}/movie/${n}?api_key=${L}&language=tr-TR`);const o=(await f.get(`${E}/movie/${n}?api_key=${L}&language=tr-TR`)).data;console.log("Movie data received:",o.title),e.innerHTML=`
      <div class="movie-popup" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:90%;max-width:800px;background-color:#222;border-radius:10px;box-shadow:0 0 20px rgba(248,119,25,0.3);max-height:80vh;overflow:auto;">
        <div class="popup-content" style="padding:20px;position:relative;">
          <span class="close-popup" style="color:#aaa;font-size:28px;font-weight:bold;cursor:pointer;position:absolute;right:15px;top:10px;z-index:10000;">&times;</span>
          <div class="popup-image" style="text-align:center;margin-bottom:20px;">
            <img src="https://image.tmdb.org/t/p/w500${o.poster_path}" alt="${o.title}" style="max-width:100%;max-height:350px;border-radius:8px;object-fit:contain;">
          </div>
          <div class="popup-details" style="color:white;">
            <h2 style="color:#f87719;margin-bottom:10px;">${o.title}</h2>
            <p class="release-date" style="color:#ccc;margin-bottom:8px;">Release Date: ${o.release_date}</p>
            <p class="rating" style="color:#ccc;margin-bottom:8px;">Rating: ${o.vote_average}/10</p>
            <p class="genres" style="color:#ccc;margin-bottom:8px;">Genres: ${o.genres.map(a=>a.name).join(", ")}</p>
            <div class="overview" style="margin-top:15px;">
              <h3 style="color:white;margin-bottom:8px;">Overview</h3>
              <p style="color:white;">${o.overview||"No overview available."}</p>
            </div>
          </div>
        </div>
      </div>
    `;const i=document.querySelector(".close-popup");i&&i.addEventListener("click",()=>{e.style.display="none"}),e.addEventListener("click",a=>{a.target===e&&(e.style.display="none")})}catch(e){console.error("Error fetching movie details:",e);const t=document.getElementById("movie-popup-container");if(t){t.innerHTML=`
        <div class="movie-popup" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:90%;max-width:800px;background-color:#222;border-radius:10px;">
          <div class="popup-content" style="padding:20px;position:relative;">
            <span class="close-popup" style="color:#aaa;font-size:28px;font-weight:bold;cursor:pointer;position:absolute;right:15px;top:10px;">&times;</span>
            <p style="color:white;">Error loading movie details. Please try again.</p>
          </div>
        </div>
      `;const o=document.querySelector(".close-popup");o&&o.addEventListener("click",()=>{t.style.display="none"})}}}(function(){typeof window<"u"&&(document.readyState==="complete"||document.readyState==="interactive"?k():document.addEventListener("DOMContentLoaded",k))})();async function C(){const n="6c6ff1eefb34466f1e524e319f306b8f",e="https://api.themoviedb.org/3";try{const t=await f.get(`${e}/movie/popular?api_key=${n}&language=tr-TR`);console.log("Veri:",t.data);const o=t.data.results;o.length>0&&[".img",".img1",".img2"].forEach((a,r)=>{const s=o[r],l=document.querySelector(a);if(l){const c=document.createElement("div");c.classList.add("movie-card"),c.dataset.movieId=s.id,c.style.cursor="pointer",c.innerHTML=`
            <div class="image-container">
              <img src="https://image.tmdb.org/t/p/w500${s.poster_path||""}" alt="${s.title}" width="280" height="406">
            </div>
            <div class="movie-details">
              <div class="movie-name">
                <h3>${s.title}</h3>
                <p>${D(s.genre_ids).join(", ")}</p>
              </div>
              <div class="stars">
                ${_(s.vote_average)}
              </div>
            </div>
          `,l.appendChild(c)}})}catch(t){console.error("Error fetching movies:",t)}}function _(n){let e="";const t=Math.floor(n/2);for(let o=0;o<5;o++)o<t?e+='<span class="fa fa-star checked"></span>':e+='<span class="fa fa-star"></span>';return e}function D(n){const e=[{id:28,name:"Aksiyon"},{id:12,name:"Macera"},{id:16,name:"Animasyon"},{id:35,name:"Komedi"},{id:80,name:"Suç"},{id:99,name:"Belgesel"},{id:18,name:"Dram"},{id:10751,name:"Aile"},{id:14,name:"Fantastik"},{id:36,name:"Tarih"},{id:27,name:"Korku"},{id:10402,name:"Müzik"},{id:9648,name:"Gizem"},{id:10749,name:"Romantik"},{id:878,name:"Bilim Kurgu"},{id:10770,name:"Televizyon"},{id:53,name:"Gerilim"},{id:10752,name:"Savaş"},{id:37,name:"Western"}];return n.map(t=>{const o=e.find(i=>i.id===t);return o?o.name:"Bilinmiyor"})}let $="6c6ff1eefb34466f1e524e319f306b8f",S="https://api.themoviedb.org/3",x=1,w=1,u=1;window.onload=function(){k(),g(x),P()};async function g(n=1,e=""){let t=document.querySelector(".catalog");t.innerHTML="";try{let o=e?`${S}/search/movie?api_key=${$}&language=tr-TR&page=${n}&query=${e}`:`${S}/movie/popular?api_key=${$}&language=tr-TR&page=${n}`;const i=await f.get(o);let a=i.data.results;w=i.data.total_pages,a.length===0?t.innerHTML="<div class='no-results'><p>Oops...</p> <p>We are sorry !</p><p>We don't have any results matching your search.</p></div>":a.forEach(r=>{let s=document.createElement("div");s.classList.add("movie-card"),s.dataset.movieId=r.id,s.style.cursor="pointer",s.innerHTML=`
          <div class="image-container">
            <img src="https://image.tmdb.org/t/p/w500${r.poster_path||""}" alt="${r.title}" width="280" height="406">
          </div>
          <div class="movie-details">
            <div class="movie-name">
              <h3>${r.title}</h3>
              <p>${H(r.genre_ids).join(", ")}</p>
            </div>
            <div class="stars">
              ${z(r.vote_average)}
            </div>
          </div>
        `,t.appendChild(s)}),A(e)}catch(o){console.error("Hata:",o)}}function A(n=""){const e=document.querySelector(".pagination");if(e.innerHTML="",u>1){let t=document.createElement("button");t.innerText="Prev",t.classList.add("pagination-button"),t.addEventListener("click",()=>{u-=3,g(u,n)}),e.appendChild(t)}for(let t=u;t<u+3&&t<=w;t++){let o=document.createElement("button");o.innerText=t,o.classList.add("pagination-button"),t===x&&o.classList.add("active"),o.addEventListener("click",()=>{x=t,g(t,n)}),e.appendChild(o)}if(u+3<=w){let t=document.createElement("button");t.innerText="Next",t.classList.add("pagination-button"),t.addEventListener("click",()=>{u+=3,g(u,n)}),e.appendChild(t)}}function z(n){let e="",t=Math.floor(n/2);for(let o=0;o<5;o++)o<t?e+='<span class="fa fa-star checked"></span>':e+='<span class="fa fa-star"></span>';return e}function H(n){const e=[{id:28,name:"Aksiyon"},{id:12,name:"Macera"},{id:16,name:"Animasyon"},{id:35,name:"Komedi"},{id:80,name:"Suç"},{id:99,name:"Belgesel"},{id:18,name:"Dram"},{id:10751,name:"Aile"},{id:14,name:"Fantastik"},{id:36,name:"Tarih"},{id:27,name:"Korku"},{id:10402,name:"Müzik"},{id:9648,name:"Gizem"},{id:10749,name:"Romantik"},{id:878,name:"Bilim Kurgu"},{id:10770,name:"Televizyon"},{id:53,name:"Gerilim"},{id:10752,name:"Savaş"},{id:37,name:"Western"}];return n.map(t=>{const o=e.find(i=>i.id===t);return o?o.name:"Bilinmiyor"})}function P(){const n=document.getElementById("search-btn"),e=document.getElementById("genre-select");n.addEventListener("click",()=>{const t=e.value.trim();t?g(1,t):g(1)}),e.addEventListener("keyup",t=>{const o=e.value.trim();t.key==="Enter"&&o&&g(1,o)})}function R(){const n=document.querySelector(".hero-container"),e=document.getElementById("movieModal"),t=document.querySelector(".close-btn"),o=document.getElementById("movieDescription");document.getElementById("movieTrailerLink");const i=document.getElementById("trailerContainer"),a=document.getElementById("trailerIframe"),r=document.getElementById("closeTrailerBtn");async function s(){let d="cccc5e6104b30f55a3f3b525ec4830b1",m="https://api.themoviedb.org/3";try{const p=(await f.get(`${m}/movie/popular?api_key=${d}&language=tr-TR`)).data.results;if(p.length>0){const y=p[Math.floor(Math.random()*p.length)];c(y)}else h()}catch(v){console.log(v),h()}}function l(d){let m="",v=Math.floor(d/2);for(let p=0;p<5;p++)p<v?m+='<span class="fa fa-star checked"></span>':m+='<span class="fa fa-star"></span>';return m}function c(d){n.style.backgroundImage=`url(https://image.tmdb.org/t/p/original/${d.backdrop_path})`,n.style.backgroundSize="cover",n.innerHTML=`
        <div class="hero-content">
        <h1>${d.title}</h1>
        <p class="star">${l(d.vote_average)}</p>
        <p class="overview">${d.overview}</p>
        <button class="trailer">Watch Trailer</button>
        <button class="detail">More Details</button>
        </div>`,document.querySelector(".trailer").addEventListener("click",p=>{p.preventDefault(),M(d.id)}),document.querySelector(".detail").addEventListener("click",p=>{p.preventDefault(),T(d)})}function h(){n.innerHTML=`
        <div class="hero-content-default">
        <h1>Let’s Make Your Own Cinema</h1>
        <p>Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers.</p>
        <button class="started">Get Started</button>
        </div>`}async function M(d){let v=`https://api.themoviedb.org/3/movie/${d}/videos?api_key=cccc5e6104b30f55a3f3b525ec4830b1&language=en-US`;try{const y=(await f.get(v)).data.results.find(b=>b.type==="Trailer");if(y){const b=`https://www.youtube.com/embed/${y.key}`;a.src=b,i.style.display="block",e.style.display="block"}else alert("Sorry, no trailer available.")}catch(p){console.error("Error fetching trailer",p),alert("Sorry, there was an issue fetching the trailer.")}}function T(d){const m=d.overview||"No description available.";o.textContent=m,e.style.display="block"}t.addEventListener("click",()=>{e.style.display="none",i.style.display="none",a.src=""}),r.addEventListener("click",()=>{e.style.display="none",i.style.display="none",a.src=""}),window.onclick=function(d){d.target===e&&(e.style.display="none",i.style.display="none",a.src="")},s()}function q(){const n="6c6ff1eefb34466f1e524e319f306b8f",e="https://api.themoviedb.org/3",t=document.getElementById("movie-container");async function o(){try{const s=(await f.get(`${e}/movie/upcoming?api_key=${n}&language=tr-TR`)).data.results;if(s.length===0){t.innerHTML="<p>Yakında çıkacak film bulunamadı.</p>";return}const l=s[Math.floor(Math.random()*s.length)];t.innerHTML=`
      <div class="movie-card">
        <img src="https://image.tmdb.org/t/p/w500${l.poster_path}"
             alt="${l.title}" width="280" height="406" class="movie-poster">
        <h3 class="movie-title">${l.title}</h3>
        <div class="movie-info">
          <p><strong>Release date:</strong> <span class="release-date-value">${a(l.release_date)}</span></p>
          <p><strong>Vote / Votes:</strong><span class="vote-average">${l.vote_average}</span> / <span class="vote-count">${l.vote_count}</span></p>
          <p><strong>Popularity:</strong> <span class="popularity">  ${l.popularity.toFixed(1)} </span></p>
          <p><strong>Genre:</strong> <span class="genre">${i(l.genre_ids)}</p></span>
          <h3 class="about">ABOUT</h3>
          <p class="movie-overview">${l.overview}</p>
          <button class="add-to-library"> Add to my library</button>
        </div>
      </div>
    `}catch(r){console.error("Hata:",r),t.innerHTML="<p>Film yüklenirken hata oluştu.</p>"}}function i(r){const s={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western"};return r.map(l=>s[l]||"Bilinmeyen Tür").join(", ")}function a(r){const[s,l,c]=r.split("-");return`${c}.${l}.${s}`}o()}function G(){document.addEventListener("DOMContentLoaded",function(){const n=document.querySelector("[data-menu-open]"),e=document.getElementById("mobile-menu__container"),t=document.querySelector("[data-backdrop]"),o=document.getElementById("theme-switcher"),i=document.body;function a(){const c=e.classList.contains("open");e.classList.toggle("open",!c),t.classList.toggle("show",!c)}n.addEventListener("click",a),t.addEventListener("click",()=>{e.classList.remove("open"),t.classList.remove("show")});function r(){localStorage.getItem("theme")==="dark"?(i.classList.add("dark-theme"),document.documentElement.setAttribute("data-theme","dark"),o.classList.add("dark-mode")):(i.classList.remove("dark-theme"),document.documentElement.setAttribute("data-theme","light"),o.classList.add("light-mode"))}o.addEventListener("click",()=>{i.classList.contains("dark-theme")?(i.classList.remove("dark-theme"),document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("theme","light"),o.classList.remove("dark-mode"),o.classList.add("light-mode")):(i.classList.add("dark-theme"),document.documentElement.setAttribute("data-theme","dark"),localStorage.setItem("theme","dark"),o.classList.remove("light-mode"),o.classList.add("dark-mode"))}),localStorage.getItem("theme")||localStorage.setItem("theme","dark"),r();const s=document.querySelectorAll(".nav-link");window.location.pathname.split("/").pop();const l=localStorage.getItem("activePage");if(l){const c=document.querySelector(`.nav-link[href*='${l}']`);c&&c.classList.add("active")}s.forEach(c=>{c.addEventListener("click",function(){const h=c.getAttribute("href");localStorage.setItem("activePage",h)})})})}R();C();g();q();G();
//# sourceMappingURL=main-DTBXn4B0.js.map
