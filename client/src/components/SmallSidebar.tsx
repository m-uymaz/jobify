import { FunctionComponent } from 'react';
import '../assets/css/small-sidebar.scss';

import { FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import NavLinks from './NavLinks';
import Logo from './Logo';

const SmallSidebar: FunctionComponent = () => {
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
  <div className="small-sidebar">
    <div className={ showSidebar ? 'small-sidebar-container show-sidebar' : 'sidebar-small-container' }>
      <div className='content'>
        <button className='close-btn' onClick={toggleSidebar}>
          <FaTimes />
        </button>
        <header>
          <Logo />
        </header>
        <NavLinks toggleSidebar={toggleSidebar}/>
      </div>
    </div>
  </div>
  )
}

export default SmallSidebar;