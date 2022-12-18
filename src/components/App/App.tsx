import React, { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { getUser } from '../../controllers/userController';
import { io, Socket } from "socket.io-client";

import DashboardPage from '../../views/DashboardPage/DashboardPage';
import GamePage from '../../views/GamePage/GamePage';
import LoginPage from '../../views/LoginPage/LoginPage';
import RegisterPage from '../../views/RegisterPage/RegisterPage';

export const socket: Socket = io();

export default function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setUser(await getUser());
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Redirect exact from="/" to="/login" />

          {/* Login page */}
          <Route exact path="/login">
            {
              user ?
                <Redirect to="/dashboard" />
                :
                <LoginPage />
            }
          </Route>

          {/* Register page */}
          <Route exact path="/register">
            {
              <RegisterPage />
            }
          </Route>

          {/* Dashboard page */}
          <Route exact path="/dashboard">
            {
              user ?
                <DashboardPage />
                :
                <Redirect to="/login" />
            }
          </Route>

          {/* Game page */}
          <Route exact path="/game/:room">
            {
              user ?
                <GamePage />
                :
                <Redirect to="/login" />
            }
          </Route>

          <Route>
            <h1>404 you did a goof</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
