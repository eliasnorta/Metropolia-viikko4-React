import React from 'react';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router';
import {useNavigate} from 'react-router';

const Single = () => {
  const {state} = useLocation();
  const item = state.item;

  const navigate = useNavigate();

  return (
    <div open={item !== null}>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
      <img src={item.thumbnail} alt={item.title} />

      {item.media_type === 'image/jpeg' ? (
        <img src={item.filename} alt={item.title} />
      ) : item.media_type === 'video/mp4' ? (
        <video src={item.filename} controls width="400" />
      ) : null}

      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

Single.propTypes = {};

export default Single;
