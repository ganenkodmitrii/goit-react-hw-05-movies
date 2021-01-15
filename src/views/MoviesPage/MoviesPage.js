import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { fetchMoviesByName, POSTER_URL } from '../../services/moviesAPI';
import Status from '../../services/status';
import SearchMovie from '../../components/SearchMovie/SearchMovie';
import Loading from '../../components/Loading/Loading';
import ErrorView from '../../components/ErrorView/ErrorView';
import NoFoundImage from '../../images/poster-not-found.jpg';
import s from './MoviesPage.module.css';

export default function MoviePage() {
    const { url } = useRouteMatch();
    const history = useHistory();
    const location = useLocation();
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(Status.IDLE);

    useEffect(() => {
        if (location.search === '') {
            return;
        }

        const newSearch = new URLSearchParams(location.search).get('query');
        setQuery(newSearch);
    }, [location.search]);

    useEffect(() => {
        if (!query) return;
        setStatus(Status.PENDING);
        fetchMoviesByName(query)
            .then(({ results }) => {
                if (results.length === 0) {
                    setError(`Ничего не найдено с таким ${query} названием!`);
                    setStatus(Status.REJECTED);
                    return;
                }
                setMovies(results);
                setStatus(Status.RESOLVED);
            })
            .catch(error => {
                console.log(error);
                setError('Что-то пошло не так. Зайдите позже.');
                setStatus(Status.REJECTED);
            });
    }, [query]);

    const handleFormSubmit = newSearch => {
        if (query === newSearch) return;
        setQuery(newSearch);
        setMovies(null);
        setError(null);
        setStatus(Status.IDLE);
        history.push({ ...location, search: `query=${newSearch}` });
    };

    return (
        <>
            <SearchMovie formSubmitHandler={handleFormSubmit} />
            {status === Status.PENDING && <Loading />}
            {status === Status.REJECTED && <ErrorView message={error} />}

            {status === Status.RESOLVED && (
                <ul className={s.moviesList}>
                    {movies.map(movie => (
                        <li key={movie.id} className={s.moviesItem}>
                            <Link
                                to={{
                                    pathname: `${url}/${movie.id}`,
                                    state: { from: location },
                                }}
                                className={s.moviesLink}
                            >
                                <img
                                    src={
                                        movie.poster_path
                                            ? `${POSTER_URL}${movie.poster_path}`
                                            : NoFoundImage
                                    }
                                    alt={movie.title}
                                    className={s.image}
                                />
                                <p className={s.title}>{movie.title}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
// // ImageInfo.propTypes = {
// //     images: PropTypes.array,
// //     error: PropTypes.string,
// //     status: PropTypes.string,
// //     page: PropTypes.number,
// //     searchImage: PropTypes.string,
// // };
