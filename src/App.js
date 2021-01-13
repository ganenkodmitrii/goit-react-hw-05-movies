import { Switch, Route } from 'react-router-dom';
import Container from './components/Container';
import AppBar from './components/AppBar';
import { ToastContainer } from 'react-toastify';
import './App.css';
import HomePage from './views/HomePage/HomePage';
import MoviesPage from './views/MoviesPage/MoviesPage';
import MovieDetailsPage from './views/MovieDetailsPage/MovieDetailsPage';
import NotFoundView from './views/NotFoundView';

export default function App() {
    return (
        <Container>
            <AppBar />

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
            <ToastContainer autoClose={3000} />
        </Container>
    );
}
