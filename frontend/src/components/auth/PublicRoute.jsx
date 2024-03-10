import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PublicRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return !isLoggedIn ? children : <Navigate to='/' />;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PublicRoute;
