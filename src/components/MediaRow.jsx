import PropTypes from 'prop-types';
import {useUserContext} from '../hooks/contextHooks';
import {useMedia} from '../hooks/apiHooks';
import {Link, useNavigate} from 'react-router';

const MediaRow = (props) => {
  const {item} = props;
  const {user} = useUserContext();
  const {deleteMedia} = useMedia();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this media?')) {
      try {
        const token = localStorage.getItem('token');
        const result = await deleteMedia(item.media_id, token);
        alert('Media deleted successfully!');
        navigate(0);
      } catch (error) {
        console.error('Error deleting media:', error);
        alert('Failed to delete media. Please try again.');
      }
    }
  };

  MediaRow.propTypes = {
    item: PropTypes.object.isRequired,
  };

  return (
    <tr key={item.media_id}>
      <td>{item.username}</td>
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>
        <Link to="/single" state={{item}}>
          Show
        </Link>
      </td>
      {user && (
        <>
          <td>
            <button
              className="your tailwind classes here"
              onClick={() => console.log('modify', item)}
            >
              Modify
            </button>
          </td>
          <td>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default MediaRow;
