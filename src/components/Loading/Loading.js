import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './Loading.module.css';
function Loading() {
    return (
        <div className={s.overlay}>
            <Loader
                type="Circles"
                color="#cf4711"
                height={200}
                width={200}
                timeout={2000}
            />
        </div>
    );
}

export default Loading;
