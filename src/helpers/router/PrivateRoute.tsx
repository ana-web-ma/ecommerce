import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = (): React.ReactElement | null => {
  const auth = true;
  return auth ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateRoute;
