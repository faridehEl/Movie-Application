const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
const form=document.getElementById('form')
const search=document.getElementById('search')
const main= document.getElementById('main')

 getMovie(API_URL)
async function getMovie(url){
    const res=await fetch(url)
    const data= await res.json()
    showMovie(data.results)
}
function showMovie(movies){
    main.innerHTML=""
    movies.forEach(movie => {
        const movieEl=document.createElement("div")
        movieEl.classList.add("movie")
        movieEl.innerHTML=`<img src="${IMG_PATH + movie.poster_path}"/>
        <div class="movie-info">
            <h4>${movie.title}</h4>
            <span class="${colorVote(movie.vote_average)}">${movie.vote_average}</span>
        </div>
        <div class="overview">
        ${movie.overview}
        </div>`
        main.appendChild(movieEl)
    });
}
function colorVote(vote){
    if(vote > 8) return "green"
    else if (vote<=8 && vote > 5) return "orange"
    else if(vote <= 5) return "red"
}
form.addEventListener('submit',
(e)=>{
    e.preventDefault()
    const searchWord=search.value
    if(searchWord && searchWord!=""){
        getMovie(SEARCH_API + searchWord)
        search.value=""
    }
    else{
        window.location.reload
    }
})