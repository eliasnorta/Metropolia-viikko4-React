import React, {useState, useEffect} from 'react';
import heartIcon from '../assets/heart-svgrepo-com.svg';
import heartFilledIcon from '../assets/heart-filled.svg';
import {useUserContext} from '../hooks/contextHooks';

const Likes = ({
  mediaId,
  postLike,
  deleteLike,
  getLikeCountByMediaId,
  getLikeByUser,
}) => {
  const {user} = useUserContext();
  const [likeCount, setLikeCount] = useState(0);
  const [userLike, setUserLike] = useState(false);
  const [userLikeId, setUserLikeId] = useState(null);

  const updateUserLikeState = (liked, likeId = null) => {
    setUserLike(liked);
    setUserLikeId(likeId);
  };

  const refreshLikeData = async (token) => {
    try {
      const [countResult, userLikeResult] = await Promise.all([
        getLikeCountByMediaId(mediaId),
        user?.user_id ? getLikeByUser(mediaId, user.user_id, token) : null,
      ]);

      setLikeCount(countResult.count);
      updateUserLikeState(!!userLikeResult, userLikeResult?.like_id);
    } catch (error) {
      console.error('Error refreshing like data:', error);
    }
  };

  const handleClick = async () => {
    const token = localStorage.getItem('token');

    try {
      if (userLike && userLikeId) {
        await deleteLike(userLikeId, token);
        updateUserLikeState(false);
        setLikeCount((prev) => prev - 1);
      } else {
        const newLike = await postLike(mediaId, token);
        updateUserLikeState(true, newLike.like_id);
        setLikeCount((prev) => prev + 1);
      }

      await refreshLikeData(token);
    } catch (error) {
      console.error('Error handling like click:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    refreshLikeData(token);
  }, [mediaId, getLikeCountByMediaId, getLikeByUser, user]);

  const heartSrc = userLike ? heartFilledIcon : heartIcon;
  const likeText = userLike ? 'Liked' : 'Like';
  const countColor = userLike ? 'text-red-500 font-bold' : 'text-white';

  return (
    <button onClick={handleClick} className="cursor-pointer">
      <div className="flex gap-1">
        <img src={heartSrc} alt="heart" width="20" height="20" />
        <span>{likeText}</span>
        <span className={`ml-1 ${countColor}`}>{likeCount}</span>
      </div>
    </button>
  );
};

export default Likes;
