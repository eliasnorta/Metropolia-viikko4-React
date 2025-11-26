import React, {useContext, useEffect} from 'react';
import {UserContext} from '../contexts/UserContext';

const Logout = () => {
  const {handleLogout} = useContext(UserContext);

  useEffect(() => {
    handleLogout();
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
