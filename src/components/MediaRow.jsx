import PropTypes from 'prop-types';
import {useUserContext} from '../hooks/contextHooks';
import {Link, useNavigate} from 'react-router';
import {useState} from 'react';
import EditModal from './EditModal';
import Likes from './Likes';

const MediaRow = (props) => {
  const {
    item,
    deleteMedia,
    modifyMedia,
    postLike,
    deleteLike,
    getLikeCountByMediaId,
    getLikeByUser,
  } = props;
  const {user} = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        alert('Cannot delete media');
      }
    }
  };

  const handleUpdate = () => {
    setIsModalOpen(true);
  };

  const handleModify = async (updatedData) => {
    try {
      const token = localStorage.getItem('token');
      await modifyMedia(item.media_id, updatedData, token);
      alert('Media updated successfully!');
      navigate(0);
    } catch (error) {
      console.error('Error updating media:', error);
      alert('Cannot update media');
    }
  };

  MediaRow.propTypes = {
    item: PropTypes.object.isRequired,
    deleteMedia: PropTypes.func.isRequired,
    modifyMedia: PropTypes.func.isRequired,
    postLike: PropTypes.func.isRequired,
    deleteLike: PropTypes.func.isRequired,
    getLikeCountByMediaId: PropTypes.func.isRequired,
    getLikeByUser: PropTypes.func.isRequired,
  };

  return (
    <>
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
          <Link
            to="/single"
            state={{item}}
            className="bg-[#363636] p-2 hover:bg-black"
          >
            Show
          </Link>
        </td>
        {user && (
          <>
            <td>
              <button
                className="bg-[#363636] p-1 hover:bg-black cursor-pointer"
                onClick={handleUpdate}
              >
                Modify
              </button>
            </td>
            <td>
              <button
                className="bg-[#363636] p-1 hover:bg-black cursor-pointer"
                onClick={handleDelete}
              >
                Delete
              </button>
            </td>
            <td>
              <Likes
                mediaId={item.media_id}
                postLike={postLike}
                deleteLike={deleteLike}
                getLikeCountByMediaId={getLikeCountByMediaId}
                getLikeByUser={getLikeByUser}
              />
            </td>
          </>
        )}
      </tr>

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={item}
        onSave={handleModify}
        modifyMedia={modifyMedia}
      />
    </>
  );
};

export default MediaRow;
