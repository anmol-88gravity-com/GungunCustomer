import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Axios} from './Axios';
import {logout} from '../store/auth/authSlice';

const WithAxios = ({children}) => {
  const dispatch = useDispatch();

  useMemo(() => {
    Axios.interceptors.response.use(
      function (response) {
        return response;
      },
      async error => {
        if (error?.response?.status === 401) {
          dispatch(logout());
        }
        // console.log("error",error);
        return Promise.reject(error);
      },
    );
  }, []);

  return children;
};

export default WithAxios;
