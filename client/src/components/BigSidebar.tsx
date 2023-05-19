import { FunctionComponent } from 'react'
import '../assets/css/big-sidebar.scss';
import { useAppContext } from '../context/appContext';
import NavLinks from './NavLinks';
import Logo from './Logo';

const BigSidebar: FunctionComponent = () => {
  const { showSidebar, toggleSidebar } = useAppContext()

  return (
    <div className='big-sidebar'>
      <div className={showSidebar ? 'big-sidebar-container' : 'sidebar-container show-big-sidebar'}>
        <div className="content">
          <header>
            <Logo/>
          </header>
          <NavLinks toggleSidebar={toggleSidebar}/>
        </div>
      </div>
    </div>
  )
}

export default BigSidebar;