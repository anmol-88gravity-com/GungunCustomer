import React, {createContext, useContext, useState} from 'react';
import {ErrorModal} from '../components/common/ErrorModal';
export const ErrorContext = createContext({});

export const useError = () => {
  const {setError} = useContext(ErrorContext);
  return setError;
};

export const ErrorContextProvider = ({children}) => {
  const [error, setError] = useState('');

  const value = {setError};

  return (
    <ErrorContext.Provider value={value}>
      {children}
      <ErrorModal
        error={error}
        onClose={() => setError('')}
        visible={Boolean(error)}
      />
    </ErrorContext.Provider>
  );
};
