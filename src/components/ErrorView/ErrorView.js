import PropTypes from 'prop-types';

export default function ErrorView({ message }) {
    return (
        <div role="alert">
            <p>Извините, что-то пошло не так. Error: {message}</p>
        </div>
    );
}
ErrorView.propTypes = {
    message: PropTypes.string,
};
