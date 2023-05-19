import { FunctionComponent } from 'react';
import{ Outlet, Link } from 'react-router-dom';
import BigSidebar from '../../components/BigSidebar';
import Navbar from '../../components/Navbar';
import SmallSidebar from '../../components/SmallSidebar';

const SharedLayout: FunctionComponent = () => {
  return <main className='dashboard'>
      {/* <SmallSidebar/>
      <BigSidebar/> */}
      <div>
      <Navbar/>
        <div className='dashboard-page'>
          <Outlet />
        </div>
      </div>
    </main>
}

export default SharedLayout;