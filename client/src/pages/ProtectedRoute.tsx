import { useEffect } from 'react';
import { useAppContext } from "../context/appContext";
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}: any) => {
  const { user } = useAppContext();

  return user ? children : <Navigate to={'/landing'}/>
}

export default ProtectedRoute;
