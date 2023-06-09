import { useState } from "react";
import { changeRoute } from "../scripts/tools/router";
import { registerUser } from '../scripts/controllers/userController';


export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterUser = (e: any) => {
    e.preventDefault();
    const user = { username: username, password: password };
    registerUser(user);
  };

  return (
    <div className="login-page">
      <div className="box__form box__form--login-user-form">
        <center>
          <form onSubmit={(e) => handleRegisterUser(e)}>
            <h1>Register</h1>
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
          <a onClick={() => changeRoute('/login')}>Login</a>
        </center>
      </div>
    </div>
  );
}
