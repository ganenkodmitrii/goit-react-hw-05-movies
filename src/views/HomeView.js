import { useState, useEffect } from 'react';
import * as moviesAPI from '../services/moviesAPI';
// import { fetchTrendingsMovies, POSTER_URL } from '../services/moviesAPI';
import { Link } from 'react-router-dom';
import s from './HomeView.module.css';

export default function HomeView() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        moviesAPI
            .fetchTrendingsMovies()
            .then(moviesTrend => setMovies(moviesTrend.results));
    }, []);
    return (
        <>
            <p>Trending today</p>
            {movies && (
                <ul className={s.moviesList}>
                    {movies.map(movie => (
                        <li key={movie.id}>
                            <Link to={`/movies/${movie.id}`}>
                                {/* <img
                                    src={
                                        moviesAPI.POSTER_URL + movie.poster_path
                                    }
                                    alt={movie.title}
                                    width="300"
                                    height="450"
                                /> */}
                                <p>{movie.title}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
