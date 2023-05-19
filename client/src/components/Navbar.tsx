import { useState, FunctionComponent, useRef, useEffect } from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';

import '../assets/css/navbar.scss';

const Navbar: FunctionComponent = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { toggleSidebar, user, logoutUser } = useAppContext();

  const userDropdown = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let handler = (e: any) => {
      if(!userDropdown.current?.contains(e.target)) {
        setShowLogout(false);
      }
    }
    document.addEventListener('mousedown', handler);

    return() => {
      document.removeEventListener("mousedown", handler);
    }
  });

  return <nav>
    <div className="nav-center">
      <button type='button' className='toggle-btn' onClick={toggleSidebar}>
        <FaAlignLeft />
      </button>
      <div>
        <Logo />
        <h3 className='logo-text'>dashboard</h3>
      </div>
      <div ref={userDropdown} className="btn-container">
        <button type='button' className='btn' onClick={() => setShowLogout(!showLogout)}>
          <FaUserCircle />
          { user.name }
          <FaCaretDown />
        </button>
        <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
          <button onClick={logoutUser} type='button' className='dropdown-btn'>
            logout
          </button>
        </div>
      </div>
    </div>
  </nav>
}

export default Navbar;