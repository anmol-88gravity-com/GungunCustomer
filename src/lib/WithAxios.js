import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Axios} from './Axios';
import {logout} from '../store/auth/authSlice';

const WithAxios = ({children}) => {
  const dispatch = useDispatch();

  useMemo(() => {
    Axios.interceptors.response.use(
      function (response) {
        // Log the successful response
        // console.log('Axios Response:', response);
        return response;
      },
      async error => {
        // Log the error response
        console.error('Axios Error:', error);
        
        // Handle 401 Unauthorized error
        if (error?.response?.status === 401) {
          console.log('User is unauthorized. Logging out...');
          dispatch(logout());
        }
        
        return Promise.reject(error);
      },
    );
  }, [dispatch]);

  return children;
};

export default WithAxios;
