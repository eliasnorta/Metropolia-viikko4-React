import PropTypes from 'prop-types';

const MediaRow = (props) => {
  const {item, setSelectedItem} = props;

  MediaRow.propTypes = {
    item: PropTypes.object.isRequired,
    setSelectedItem: PropTypes.bool.isRequired,
  };

  return (
    <tr key={item.media_id}>
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td onClick={() => alert('Test')}>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>
        <button
          onClick={() => {
            setSelectedItem(item);
          }}
        >
          Open media
        </button>
      </td>
    </tr>
  );
};

export default MediaRow;
