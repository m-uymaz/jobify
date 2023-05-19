import Landing from './pages/Landing';
import Register from './pages/Register';
import Error from './pages/Error';
import ProtectedRoute from './pages/ProtectedRoute';

import AddJob from './pages/dashboard/AddJob';
import AllJobs from './pages/dashboard/AllJobs';
import Profile from './pages/Profile';
import SharedLayout from './pages/dashboard/SharedLayout';
import Stats from './pages/dashboard/Stats';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'
        element={<ProtectedRoute><SharedLayout/></ProtectedRoute>}>
          <Route index element={<Stats/>}/>
          <Route path='all-jobs' element={<AllJobs/>}/>
          <Route path='add-job' element={<AddJob/>}/>
          <Route path='profile' element={<Profile/>}/>
        </Route>
        <Route path='landing' element={<Landing/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
