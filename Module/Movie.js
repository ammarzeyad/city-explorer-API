const axios = require("axios");

function handleMovie(request, response) {

    try{
    let { searchQuery} = request.query;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;


    axios.get(url).then(results => {
        const moviesArray = results.data.results.map(movie => new Movie(movie));
        response.status(200).send(moviesArray);
    })
} catch(error){
    console.log('somethink happend', error);
}

}
class Movie{
    constructor(movie){

        this.title = movie.title;
        this.overview = movie.overview;
        this.averageVotes = movie.vote_average;
        this.totalVotes = movie.vote_count;
        this.imageUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
        this.popularity = movie.popularity;
        this.releasedOn = movie.release_date;
    }
}


module.exports = handleMovie;
