import { useState, useEffect } from 'react';
import { getMovieCredits, POSTER_URL } from '../../services/moviesAPI';
import { useParams } from 'react-router-dom';
import Status from '../../services/status';
import Loading from '../../components/Loading/Loading';
import ErrorView from '../../components/ErrorView/ErrorView';
import NoFoundImage from '../../images/not-found.jpg';
import s from './Cast.module.css';

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
                <ul className={s.castList}>
                    {actors.map(actor => (
                        <li key={actor.id} className={s.castItem}>
                            <img
                                src={
                                    actor.profile_path
                                        ? `${POSTER_URL}${actor.profile_path}`
                                        : NoFoundImage
                                }
                                alt={actor.original_name}
                                className={s.image}
                            />
                            <h4 className={s.castName}>
                                {actor.original_name}
                            </h4>
                            <p className={s.castCharacter}>{actor.character}</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
