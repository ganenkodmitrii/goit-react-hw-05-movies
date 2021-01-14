import { useState, useEffect } from 'react';
import { fetchTrendingsMovies } from '../../services/moviesAPI';
import Status from '../../services/status';
import Loading from '../../components/Loading/Loading';
import ErrorView from '../../components/ErrorView/ErrorView';
import { Link, useRouteMatch } from 'react-router-dom';
import s from './HomePage.module.css';

export default function HomePage() {
    const { url } = useRouteMatch();
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(Status.IDLE);

    useEffect(() => {
        setStatus(Status.PENDING);
        fetchTrendingsMovies()
            .then(({ results }) => {
                setMovies(results);
                setStatus(Status.RESOLVED);
            })
            .catch(error => {
                console.log(error);
                setError('Что-то пошло не так. Зайдите позже.');
                setStatus(Status.REJECTED);
            });
    }, []);
    return (
        <>
            <h1>Trending today</h1>

            {status === Status.PENDING && <Loading />}

            {status === Status.REJECTED && (
                <ErrorView message={error.message} />
            )}
            {status === Status.RESOLVED && (
                <ul className={s.moviesList}>
                    {movies.map(movie => (
                        <li className={s.moviesItem} key={movie.id}>
                            <Link
                                className={s.moviesLink}
                                to={`${url}movies/${movie.id}`}
                            >
                                <p className={s.title}>{movie.title}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
