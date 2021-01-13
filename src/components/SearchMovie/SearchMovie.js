import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';
import s from './SearchMovie.module.css';

export default function SearchMovie({ formSubmitHandler }) {
    const [search, setSearch] = useState('');

    const handleChange = e => {
        setSearch(e.currentTarget.value.toLowerCase());
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (search.trim() === '') {
            return toast.info('Ничего не ввели в поиск! :(');
        }

        formSubmitHandler(search);
        reset();
    };

    const reset = () => {
        setSearch('');
    };

    return (
        <div className={s.Searchbar}>
            <form onSubmit={handleSubmit} className={s.SearchForm}>
                <input
                    className={s.SearchFormInput}
                    type="text"
                    value={search}
                    autoComplete="off"
                    autoFocus
                    placeholder="Поиск"
                    onChange={handleChange}
                />

                <button type="submit" className={s.SearchFormButton}>
                    <span className={s.SearchFormButtonLabel}>Search</span>
                </button>
            </form>
        </div>
    );
}

SearchMovie.propTypes = {
    search: PropTypes.string,
    formSubmitHandler: PropTypes.func,
};
