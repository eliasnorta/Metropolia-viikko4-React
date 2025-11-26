import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Link, Outlet} from 'react-router';
import { UserContext } from '../contexts/UserContext';

const Layout = (props) => {
  const { user, handleAutoLogin } = useContext(UserContext);

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {user && (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/upload">Upload</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            )}
            {!user && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

Layout.propTypes = {};

export default Layout;
