import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from './components/Container';
import AppBar from './components/AppBar';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Loading from './components/Loading/Loading';

const HomePage = lazy(() =>
    import('./views/HomePage/HomePage' /* webpackChunkName: "home-view" */),
);

const MoviesPage = lazy(() =>
    import(
        './views/MoviesPage/MoviesPage' /* webpackChunkName: "movies-view" */
    ),
);

const MovieDetailsPage = lazy(() =>
    import(
        './views/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movies-details-view" */
    ),
);

const NotFoundView = lazy(() =>
    import('./views/NotFoundView' /* webpackChunkName: "not-found-view" */),
);

export default function App() {
    return (
        <Container>
            <AppBar />

            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route path="/" exact>
                        <HomePage />
                    </Route>

                    <Route path="/movies" exact>
                        <MoviesPage />
                    </Route>

                    <Route path="/movies/:movieId">
                        <MovieDetailsPage />
                    </Route>

                    <Route>
                        <NotFoundView />
                    </Route>
                </Switch>
            </Suspense>

            <ToastContainer autoClose={3000} />
        </Container>
    );
}
