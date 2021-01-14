import { useState, useEffect } from 'react';
import { getMovieReviews } from '../../services/moviesAPI';
import { useParams } from 'react-router-dom';
import Status from '../../services/status';
import Loading from '../../components/Loading/Loading';
import ErrorView from '../../components/ErrorView/ErrorView';

export default function Cast() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(Status.IDLE);

    useEffect(() => {
        getMovieReviews(movieId)
            .then(({ results }) => {
                setReviews(results);
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
                <ul>
                    {reviews.map(review => (
                        <li key={review.id}>
                            <h4>Author: {review.author}</h4>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
