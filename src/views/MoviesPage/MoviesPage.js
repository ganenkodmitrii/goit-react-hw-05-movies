import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { fetchMoviesByName } from '../../services/moviesAPI';
import Status from '../../services/status';
import SearchMovie from '../../components/SearchMovie/SearchMovie';
import Loading from '../../components/Loading/Loading';
import ErrorView from '../../components/ErrorView/ErrorView';

export default function MoviePage() {
    const { url } = useRouteMatch();

    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(Status.IDLE);

    useEffect(() => {
        if (!query) return;
        setStatus(Status.PENDING);
        fetchMoviesByName(query)
            .then(({ results }) => {
                if (results.length === 0) {
                    setError(`No results were found for ${query}!`);
                    setStatus(Status.REJECTED);
                    return;
                }
                setMovies(results);
                setStatus(Status.RESOLVED);
            })
            .catch(error => {
                console.log(error);
                setError('Something went wrong. Try again.');
                setStatus(Status.REJECTED);
            });
    }, [query]);

    const handleFormSubmit = newSearch => {
        setQuery(newSearch);
        setMovies(null);
        setError(null);
        setStatus(Status.IDLE);
    };

    return (
        <>
            <SearchMovie formSubmitHandler={handleFormSubmit} />
            {status === Status.PENDING && <Loading />}
            {status === Status.REJECTED && <ErrorView message={error} />}

            {status === Status.RESOLVED && (
                <ul>
                    {movies.map(movie => (
                        <li key={movie.id}>
                            <Link to={`${url}/${movie.id}`}>{movie.title}</Link>
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
