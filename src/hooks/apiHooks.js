// TODO: add necessary imports
import FetchData from '../utils/fetchData';
import {useEffect, useState} from 'react';

const useMedia = () => {
  // TODO: move mediaArray state here
  // TODO: move getMedia function here
  // TODO: move useEffect here

  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const json = await FetchData(import.meta.env.VITE_MEDIA_API + '/media');

      const newArray = await Promise.all(
        json.map(async (item) => {
          const result = await FetchData(
            import.meta.env.VITE_AUTH_API + item.user_id,
          );
          return {...item, username: result.username};
        }),
      );

      setMediaArray(newArray);
    } catch (error) {
      console.log('fetch error:', +error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  console.log(mediaArray);

  return {mediaArray};
};

export {useMedia};
