import React, {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const {getUserByToken} = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token from localStorage:', token);

        if (token) {
          console.log('Calling getUserByToken...');
          const data = await getUserByToken(token);
          console.log('User data received:', data);
          // Extract user data from the response
          setUserData(data.user);
        } else {
          console.log('No token found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>
        <strong>Username:</strong> {userData.username}
      </p>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>
      <p>
        <strong>User ID:</strong> {userData.user_id}
      </p>
      <p>
        <strong>Level:</strong> {userData.level_name}
      </p>
      <p>
        <strong>Created:</strong>{' '}
        {new Date(userData.created_at).toLocaleString()}
      </p>
    </div>
  );
};

export default Profile;
