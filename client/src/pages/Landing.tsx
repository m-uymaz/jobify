import { FunctionComponent } from 'react';
import '../assets/css/wrapper.scss';
import Logo from '../components/Logo';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';

const Landing: FunctionComponent = () => {
  return (
    <div>
        <nav>
            <Logo/>
        </nav>
        <div className="container page">
            <div className="info">
                <h1>
                    Job <span>tracking</span> app
                </h1>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                    Cupiditate suscipit praesentium repellat autem sint officiis id rerum ipsa sed maxime. 
                    Temporibus reiciendis natus commodi eligendi, 
                    dolorum tempora libero mollitia at.
                </p>
                <Link to='/register' className="btn btn-hero">Login/Register</Link>
            </div>
            <img src={main} className="main-img" alt="job hunt" />
        </div>
    </div>
  )
}

export default Landing;
