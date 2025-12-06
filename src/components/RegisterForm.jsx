import React from 'react';
import useForm from '../hooks/formHooks';
import {useUser} from '../hooks/apiHooks';
import {useNavigate} from 'react-router';

const RegisterForm = () => {
  const navigate = useNavigate();
  const {postUser} = useUser();

  const initValues = {
    username: '',
    email: '',
    password: '',
  };

  const doRegister = async () => {
    try {
      const result = await postUser(inputs);
      console.log('register result:', result);

      if (result && result.token) {
        navigate('/');
      }
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="registeruser">Username</label>
          <input
            name="username"
            type="text"
            id="registeruser"
            onChange={handleInputChange}
            value={inputs.username}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="registeremail">email</label>
          <input
            name="email"
            type="text"
            id="registeremail"
            onChange={handleInputChange}
            value={inputs.email}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="registerpassword">Password</label>
          <input
            name="password"
            type="password"
            id="registerpassword"
            onChange={handleInputChange}
            value={inputs.password}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
