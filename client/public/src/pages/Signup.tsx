import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await addUser({ variables: { ...formState } });
      localStorage.setItem('id_token', data.addUser.token);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" onChange={e => setFormState({ ...formState, username: e.target.value })} />
      <input type="email" placeholder="Email" onChange={e => setFormState({ ...formState, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setFormState({ ...formState, password: e.target.value })} />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
