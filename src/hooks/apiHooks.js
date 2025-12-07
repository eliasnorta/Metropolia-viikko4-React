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

  const postMedia = async (fileData, inputs, token) => {
    try {
      const mediaData = {
        filename: fileData.filename,
        media_type: fileData.media_type,
        filesize: fileData.filesize,
        title: inputs.title,
        description: inputs.description,
      };

      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(mediaData),
      };

      const mediaResult = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media',
        fetchOptions,
      );
      console.log('Media result:', mediaResult);

      return mediaResult;
    } catch (error) {
      console.error('Media post error:', error);
      throw error;
    }
  };

  const deleteMedia = async (mediaId, token) => {
    try {
      const fetchOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const mediaResult = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media/' + mediaId,
        fetchOptions,
      );
      console.log('Media result:', mediaResult);

      return mediaResult;
    } catch (error) {
      console.error('Media delete error:', error);
      throw error;
    }
  };

  const modifyMedia = async (mediaId, inputs, token) => {
    try {
      const updateData = {
        title: inputs.title,
        description: inputs.description,
      };

      const fetchOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      };

      const mediaResult = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media/' + mediaId,
        fetchOptions,
      );
      console.log('Media result:', mediaResult);

      return mediaResult;
    } catch (error) {
      console.error('Media put error:', error);
      throw error;
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  console.log(mediaArray);

  return {mediaArray, postMedia, deleteMedia, modifyMedia};
};

const useLike = () => {
  const postLike = async (mediaId, token) => {
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({media_id: parseInt(mediaId)}),
      };

      const mediaResult = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/likes',
        fetchOptions,
      );
      console.log('Like result:', mediaResult);

      return mediaResult;
    } catch (error) {
      console.error('Media like error:', error);
      throw error;
    }
  };

  const deleteLike = async (likeId, token) => {
    try {
      const fetchOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const mediaResult = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/likes/' + likeId,
        fetchOptions,
      );
      console.log('Like result:', mediaResult);

      return mediaResult;
    } catch (error) {
      console.error('Media like error:', error);
      throw error;
    }
  };

  const getLikeCountByMediaId = async (mediaId) => {
    try {
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const mediaResult = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/likes/count/' + mediaId,
        fetchOptions,
      );
      return mediaResult;
    } catch (error) {
      console.error('Media like error:', error);
      throw error;
    }
  };

  const getLikeByUser = async (mediaId, userId, token) => {
    try {
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const userLikes = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/likes/byuser/' + userId,
        fetchOptions,
      );

      // Check if the user liked the specific media item
      if (Array.isArray(userLikes)) {
        const userLike = userLikes.find(
          (like) => like.media_id === parseInt(mediaId),
        );
        return userLike || null;
      }

      return null;
    } catch (error) {
      console.error('Media like error:', error);
      throw error;
    }
  };

  return {postLike, deleteLike, getLikeCountByMediaId, getLikeByUser};
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

const useFile = () => {
  const postFile = async (file, token) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const fetchOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };

      const fileData = await fetchData(
        import.meta.env.VITE_UPLOAD_SERVER + '/upload',
        fetchOptions,
      );
      console.log('File data:', fileData);

      return fileData;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  return {postFile};
};

export {useMedia, useLike, useAuthentication, useUser, useFile};
