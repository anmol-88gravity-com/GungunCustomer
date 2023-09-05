import React, {createContext, useContext, useState} from 'react';
import {MessageModal} from '../components/common/MessageModal';

export const MsgContext = createContext({});

export const useAuthMessage = () => {
  const {setMsg} = useContext(MsgContext);
  return setMsg;
};

export const MsgContextProvider = ({children}) => {
  const [msg, setMsg] = useState('');

  const value = {setMsg};

  return (
    <MsgContext.Provider value={value}>
      {children}
      <MessageModal
        msg={msg}
        onClose={() => setMsg('')}
        visible={Boolean(msg)}
      />
    </MsgContext.Provider>
  );
};
