import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'c8025ce54a75b19e8048a85dee411da6';

export const POSTER_URL = 'https://image.tmdb.org/t/p/w500/';

export function fetchTrendingsMovies() {
    return axios
        .get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
        .then(res => res.data);
}

export function fetchMoviesByName(query) {
    return axios
        .get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`)
        .then(res => res.data);
}

export function getMovieDetails(movieId) {
    return axios
        .get(
            `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}
`,
        )
        .then(res => res.data);
}

export function getMovieCredits(movieId) {
    return axios
        .get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`)
        .then(res => res.data);
}

export function getMovieReviews(movieId) {
    return axios
        .get(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`)
        .then(res => res.data);
}
