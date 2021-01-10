import s from './AppBar.module.css';
import Navigation from '../Navigation/Navigation';

export default function AppBar() {
    return (
        <header className={s.searchBar}>
            <Navigation />
        </header>
    );
}
