import PropTypes from 'prop-types';
import {Link} from 'react-router';

const MediaRow = (props) => {
  const {item} = props;

  MediaRow.propTypes = {
    item: PropTypes.object.isRequired,
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
        <Link to="/single" state={{item}}>
          Show
        </Link>
      </td>
    </tr>
  );
};

export default MediaRow;
