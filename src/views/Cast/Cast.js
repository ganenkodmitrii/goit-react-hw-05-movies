import { useState, useEffect } from 'react';
import { getMovieCredits } from '../../services/moviesAPI';
import { useParams } from 'react-router-dom';
import Status from '../../services/status';
import Loading from '../../components/Loading/Loading';
import ErrorView from '../../components/ErrorView/ErrorView';

export default function Cast() {
    const { movieId } = useParams();
    const [actors, setActors] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(Status.IDLE);

    useEffect(() => {
        getMovieCredits(movieId)
            .then(({ cast }) => {
                setActors(cast);
                setStatus(Status.RESOLVED);
            })
            .catch(error => {
                console.log(error);
                setError('Что-то пошло не так. Зайдите позже.');
                setStatus(Status.REJECTED);
            });
    }, [movieId]);

    return (
        <>
            {status === Status.PENDING && <Loading />}

            {status === Status.REJECTED && (
                <ErrorView message={error.message} />
            )}
            {status === Status.RESOLVED && (
                <ul
                    style={{
                        marginTop: '15px',
                        display: 'flex',
                        flexWrap: 'wrap',
                    }}
                >
                    {actors.map(actor => (
                        <li key={actor.id}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                                alt={actor.original_name}
                                width="100"
                            />
                            <h4>{actor.original_name}</h4>
                            <p>{actor.character}</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
