import { useState, FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import FormRow from '../components/FormRow';
import Alert from '../components/Alert';
import '../assets/css/register-page.scss';
import { useAppContext } from '../context/appContext';

interface RegisterState {
  name: string;
  email: string;
  password: string;
  isMember: boolean;
}

const Register: FunctionComponent = () => {

  const [values, setValues] = useState<RegisterState>({
    name: '',
    email: '',
    password: '',
    isMember: true
  });
  const navigate = useNavigate();
  const { user, showAlert, displayAlert, hideAlert, registerUser, loginUser, isLoading } = useAppContext();

  const toggleMember = () => {
    setValues({ name: '', email: '', password: '', isMember: !values.isMember });
    hideAlert();
  }

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    hideAlert();
  }

  const onSubmit = (e: any) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return
    }
    hideAlert();
    const currentUser = { name, email, password };
    if (isMember) {
      loginUser(currentUser);
      setTimeout(() => {
        hideAlert();
      }, 2000);
    } else {
      registerUser(currentUser);
      setTimeout(() => {
        hideAlert();
      }, 2000);
    }
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <div className='full-page'>
      <form className='form' onSubmit={onSubmit} action="#">
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {!values.isMember && <FormRow type='text' name='name' value={values.name} handleChange={handleChange} labelText='Name' />}
        <FormRow type='email' name='email' value={values.email} handleChange={handleChange} labelText='Email' />
        <FormRow type='password' name='password' value={values.password} handleChange={handleChange} labelText='Password' />
        <button type='submit' className='btn btn-block' disabled={isLoading}>{values.isMember ? 'Login' : 'Submit'}</button>
        <div>
          {values.isMember ? 'Not a member?' : 'Already a member?'}
          <button type='button' onClick={toggleMember} className='member-btn'>{values.isMember ? 'Register' : 'Login'}</button>
        </div>
      </form>
    </div>
  );
}

export default Register;