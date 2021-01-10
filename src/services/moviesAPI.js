const BASE_URL = 'https://api.themoviedb.org/';
const API_KEY = 'c8025ce54a75b19e8048a85dee411da6';

// export const POSTER_URL = 'https://image.tmdb.org/t/p/w500/';

async function fetchWithErrorHandling(url = '', config = {}) {
    const response = await fetch(url, config);
    return response.ok
        ? await response.json()
        : Promise.reject(new Error('Not found'));
}

export function fetchTrendingsMovies() {
    return fetchWithErrorHandling(
        `${BASE_URL}3/trending/movie/day?api_key=${API_KEY}`,
    );
}

// export function fetchBooks() {
//     return fetchWithErrorHandling(`${BASE_URL}/books`);
// }

// export function fetchBookById(bookId) {
//     return fetchWithErrorHandling(`${BASE_URL}/books/${bookId}?_expand=author`);
// }
