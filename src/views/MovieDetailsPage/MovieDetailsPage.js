import { useState, useEffect, lazy, Suspense } from 'react';
import {
    useParams,
    NavLink,
    Route,
    useRouteMatch,
    useHistory,
    useLocation,
} from 'react-router-dom';
import { getMovieDetails, POSTER_URL } from '../../services/moviesAPI';
import Status from '../../services/status';
import Loading from '../../components/Loading/Loading';
import ErrorView from '../../components/ErrorView/ErrorView';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() =>
    import('../Cast/Cast' /* webpackChunkName: "cast-subview"*/),
);

const Reviews = lazy(() =>
    import('../Reviews/Reviews' /* webpackChunkName: "reviews-subview"*/),
);

export default function MovieDetailsPage() {
    const history = useHistory();
    const location = useLocation();
    const { movieId } = useParams();
    const { url, path } = useRouteMatch();
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

    const handleGoBack = () => {
        if (!location.state) {
            history.push('/');
            return;
        }
        history.push({ ...location.state.from });
    };

    return (
        <>
            <button onClick={handleGoBack} type="button" className={s.button}>
                Go back
            </button>
            {status === Status.PENDING && <Loading />}

            {status === Status.REJECTED && <ErrorView message={error} />}

            {status === Status.RESOLVED && (
                <>
                    <div className={s.contentBox}>
                        <div>
                            <img
                                src={movie.src}
                                alt={movie.title}
                                width="200"
                            />
                        </div>
                        <div className={s.textBox}>
                            <h2>{movie.title}</h2>
                            <p>User Score: {movie.score} %</p>
                            <h3>Overview</h3>
                            <p>{movie.overview}</p>
                            <h3>Genres</h3>
                            <ul>
                                {movie.genres.map(genre => (
                                    <li key={genre.id}>{genre.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <ul className={s.navBox}>
                            <li>
                                <NavLink
                                    to={{
                                        pathname: `${url}/cast`,
                                        state: {
                                            from: location.state
                                                ? location.state.from
                                                : '/',
                                        },
                                    }}
                                    className={s.link}
                                    activeClassName={s.activeLink}
                                >
                                    Cast
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={{
                                        pathname: `${url}/reviews`,
                                        state: {
                                            from: location.state
                                                ? location.state.from
                                                : '/',
                                        },
                                    }}
                                    className={s.link}
                                    activeClassName={s.activeLink}
                                >
                                    Reviews
                                </NavLink>
                            </li>
                        </ul>

                        <Suspense fallback={<Loading />}>
                            <Route path={`${path}/cast`}>
                                {status === Status.RESOLVED && <Cast />}
                            </Route>
                            <Route path={`${path}/reviews`}>
                                {status === Status.RESOLVED && <Reviews />}
                            </Route>
                        </Suspense>
                    </div>
                </>
            )}
        </>
    );
}
