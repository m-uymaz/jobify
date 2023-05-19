import { Link } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import '../assets/css/error-page.scss';

const ErrorPage = () => {
    return <div className='full-page'>
        <div>
            <img src={img} alt="not found" />
            <h3>Ohh! Page not found..</h3>
            <p>We can't seem to find the page you're looking for</p>
            <Link to='/'>Back Home</Link>
        </div>
    </div> 
}

export default ErrorPage;