const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=92de2f985e5e4eb286014f1e81e11605&sort_by=popularity.desc&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w500";
const main = document.getElementById("content");
const form = document.getElementById("form");
const search = document.getElementById("search");
getMovies(APIURL);
  async function getMovies(APIURL) {
   const resp = await fetch(APIURL);
   const respData = await resp.json();
   console.log(respData);
   showMovies(respData.results);
}
function showMovies(data) {
main.innerHTML = "";
data.forEach((movie) => {
  const { poster_path, title, vote_average, release_date, overview } = movie;
  const movies = document.createElement("div");
  movies.classList.add("movie");
  movies.innerHTML = 
  `<img src="${IMGPATH + poster_path}" alt="${title}"/>
   <div class="movie-info">
     <h3>${title}</h3>
     <span class="${getClassByRate(vote_average)}">${vote_average}</span>
     <p>${release_date}<p>
   </div>
   <div class="overview">
     <h3>Overview:</h3>
     ${overview}
  </div>`;
main.appendChild(movies);
});
}
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
form.addEventListener("submit", (e) => {  
  e.preventDefault();
  const searchTerm = search.value;
     if (searchTerm) {
     getMovies(`https://api.themoviedb.org/3/search/movie?&api_key=92de2f985e5e4eb286014f1e81e11605&query=${searchTerm}&page=1`);
     search.value = "";
   }
}
);