const SingleView = (props) => {
  const {item, setSelectedItem} = props;

  return (
    <dialog open={item !== null}>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
      <img src={item.thumbnail} alt={item.title} />

      {item.media_type === 'image/jpeg' ? (
        <img src={item.filename} alt={item.title} />
      ) : item.media_type === 'video/mp4' ? (
        <video src={item.filename} controls width="400" />
      ) : null}

      <button onClick={() => setSelectedItem(null)}>Close</button>
    </dialog>
  );
};

export default SingleView;
