import {useEffect, useState} from 'react';
import MediaRow from '../components/MediaRow';
import FetchData from '../utils/fetchData';

const Home = () => {
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

  return (
    <>
      <>
        <h2>My Media</h2>
        <table>
          <thead>
            <tr>
              <th>Owners username</th>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Description</th>
              <th>Created</th>
              <th>Size</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mediaArray.map((item) => (
              <MediaRow key={item.media_id} item={item} />
            ))}
          </tbody>
        </table>
      </>
    </>
  );
};
export default Home;
