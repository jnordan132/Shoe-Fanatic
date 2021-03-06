import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (error) {
      console.log(Object.values(error));
    }

    try {
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          firstName: formState.firstName,
          lastName: formState.lastName,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (e) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="signup">
      <h4>Sign-Up</h4>
      <form onSubmit={handleFormSubmit}>
        <div className="text_area">
          <input
            type="firstName"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            className="text_input"
          />
        </div>
        <div className="text_area">
          <input
            type="lastName"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            className="text_input"
          />
          </div>
        <div className="text_area">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="text_input"
          />
        </div>
        <div className="text_area">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="text_input"
          />
        </div>
        <input type="submit" value="SIGN UP" className="btn" />
      </form>
      <a className="link" href="/login">
        Login
      </a>
    </div>
  );
}

export default Signup;
