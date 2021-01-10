import { Switch, Route } from 'react-router-dom';
import HomeView from './views/HomeView';
import NotFoundView from './views/NotFoundView';

import './App.css';
import Container from './components/Container';
import AppBar from './components/AppBar';

export default function App() {
    return (
        <Container>
            <AppBar />

            <Switch>
                <Route path="/" exact>
                    <HomeView />
                </Route>

                <Route path="/movies"></Route>

                <Route>
                    <NotFoundView />
                </Route>
            </Switch>
        </Container>
    );
}
