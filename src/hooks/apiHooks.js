// TODO: add necessary imports
import fetchData from '../utils/fetchData';
import {useEffect, useState} from 'react';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const json = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');

      const newArray = await Promise.all(
        json.map(async (item) => {
          const result = await fetchData(
            import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
          );
          return {...item, username: result.username};
        }),
      );

      setMediaArray(newArray);
    } catch (error) {
      console.log('fetch error:', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  console.log(mediaArray);

  return {mediaArray};
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      };
      const loginResult = await fetchData(
        import.meta.env.VITE_AUTH_API + '/auth/login',
        fetchOptions,
      );
      console.log('Login result:', loginResult);

      if (loginResult && loginResult.token) {
        localStorage.setItem('token', loginResult.token);
      }

      return loginResult;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    try {
      const fetchOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const userData = await fetchData(
        import.meta.env.VITE_AUTH_API + '/users/token',
        fetchOptions,
      );

      return userData;
    } catch (error) {
      console.error('Error fetching user by token:', error);
    }
  };

  const postUser = async (inputs) => {
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      };
      const registerResult = await fetchData(
        import.meta.env.VITE_AUTH_API + '/users',
        fetchOptions,
      );
      console.log('Register result:', registerResult);

      if (registerResult && registerResult.token) {
        localStorage.setItem('token', registerResult.token);
      }

      return registerResult;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  return {getUserByToken, postUser};
};

export {useMedia, useAuthentication, useUser};
