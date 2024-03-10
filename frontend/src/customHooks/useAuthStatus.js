import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkLoginStatus } from '../redux/features/auth/auth.slice';

export const useAuthStatus = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyAuth = async () => {
      await dispatch(checkLoginStatus());
    };

    verifyAuth();
  }, [dispatch]);
};
