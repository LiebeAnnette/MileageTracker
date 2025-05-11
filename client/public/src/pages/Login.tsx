import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { ...formState } });
      localStorage.setItem("id_token", data.login.token);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setFormState({ ...formState, password: e.target.value })
        }
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
