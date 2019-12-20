import React, { useState } from 'react';

import { axiosWithAuth } from "../auth/axiosWithAuth";

export const Login = (props) => {
  const [credentials, setCredentials] = useState(
    {
      username: "",
      password: ""
    }
  );

  const handleChange = (event) => {
    setCredentials(
      {
        ...credentials,
        [event.target.name]: event.target.value
      }
    );
  };

  // make a post request to retrieve a token from the api
  const login = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .post("/login", credentials)
      .then(responce => {
        console.log(responce);
        localStorage.setItem("token", responce.data.payload);
        props.history.push("/protected");
      })
      .catch(error => console.log(error));
  };



  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={login}>
          <input
            type="text"
            name="username"
            value={credentials.username}
            placeholder="User Name"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            placeholder="Password"
            onChange={handleChange}
          />
          <button>Submit</button>
        </form>
      </>
  );
};

//export default Login;
