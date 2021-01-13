import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, POSTER_URL } from '../../services/moviesAPI';
import Status from '../../services/status';
import Loading from '../../components/Loading/Loading';
import ErrorView from '../../components/ErrorView/ErrorView';

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(Status.IDLE);

    useEffect(() => {
        setStatus(Status.PENDING);
        getMovieDetails(movieId)
            .then(
                ({
                    poster_path,
                    original_title,
                    popularity,
                    overview,
                    genres,
                }) => {
                    setMovie({
                        src: `${POSTER_URL}${poster_path}`,
                        title: original_title,
                        score: popularity.toFixed(0),
                        overview,
                        genres,
                    });
                    setStatus(Status.RESOLVED);
                },
            )
            .catch(error => {
                console.log(error);
                setError('Something went wrong. Try again.');
                setStatus(Status.REJECTED);
            });
    }, [movieId]);

    return (
        <>
            {status === Status.PENDING && <Loading />}

            {status === Status.REJECTED && <ErrorView message={error} />}

            {status === Status.RESOLVED && (
                <div style={{ marginTop: '15px', display: 'flex' }}>
                    <div>
                        <img src={movie.src} alt={movie.title} width="200" />
                    </div>
                    <div style={{ marginLeft: '10px' }}>
                        <h2>{movie.title}</h2>
                        <p>User Score: {movie.score} %</p>
                        <h3>Overview</h3>
                        <p>{movie.overview}</p>
                        <h4>Genres</h4>
                        <ul>
                            {movie.genres.map(genre => (
                                <li key={genre.id}>{genre.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}
// ({
//     poster_path,
//     original_title,
//     popularity,
//     overview,
//     genres,
// }) => {
//     setMovie({
//         src: `https://image.tmdb.org/t/p/w500/${poster_path}`,
//         title: original_title,
//         score: popularity.toFixed(0),
//         overview,
//         genres,
//     //     });
//         setStatus(Status.RESOLVED);
//     },
// )
