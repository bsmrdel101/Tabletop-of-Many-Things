import React, { useState } from "react";
import { changeRoute } from "../../scripts/tools/router";
import { loginUser } from '../../controllers/userController';
import './LoginPage.scss';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginUser = (e: any) => {
    e.preventDefault();
    const user = { username: username, password: password };
    loginUser(user);
  };

  return (
    <div className="login-page">
      <div className="box__form box__form--login-user-form">
        <center>
          <form onSubmit={(e) => handleLoginUser(e)}>
            <h1>Login</h1>
            <label className="box__form--login-username">Username
              <input
                placeholder="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>Password
              <input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Submit</button>
          </form>
          <a onClick={() => changeRoute('/register')}>Register</a>
        </center>
      </div>
    </div>
  );
}
