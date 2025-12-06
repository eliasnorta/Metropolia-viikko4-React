import {useEffect, useState} from 'react';
import MediaRow from '../components/MediaRow';
import {useMedia} from '../hooks/apiHooks';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const {mediaArray, deleteMedia, modifyMedia} = useMedia();

  return (
    <>
      <h2>My Media</h2>
      <table
        className="border-collapse 
               [&_th]:border [&_td]:border 
               [&_th]:border-gray-300 [&_td]:border-gray-300
               [&_th]:px-4 [&_td]:px-4
               [&_th]:py-2 [&_td]:py-2
               border border-gray-300"
      >
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
            <MediaRow
              key={item.media_id}
              item={item}
              deleteMedia={deleteMedia}
              modifyMedia={modifyMedia}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Home;
