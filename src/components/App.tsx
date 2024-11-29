import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { getUser } from '../scripts/controllers/userController';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/reducers/userSlice';
import DashboardPage from '../pages/DashboardPage';
import GamePage from '../pages/GamePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CharactersPage from '../pages/CharactersPage';
import CharacterSheetPage from '../pages/CharacterSheetPage';


export default function App() {
  const dispatch = useAppDispatch();
  const [userState, setUserState] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();
      setUserState(user);
      dispatch(setUser(user));
    };
    fetchData();
  }, []);
  

  return (
    <Router>
      <>
        <Switch>
          {/* Login page */}
          <Route exact path="/login">
            {
              userState ?
                <Redirect to="/" />
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

          {/* Game page */}
          <Route exact path="/game/:room">
            {
              userState ?
                <GamePage />
                :
                <LoginPage />
            }
          </Route>

          {/* Characters page */}
          <Route exact path="/characters">
            {
              userState ?
                <CharactersPage />
                :
                <LoginPage />
            }
          </Route>

          {/* Character Sheet page */}
          <Route exact path="/characters/:id">
            {
              userState ?
                <CharacterSheetPage />
                :
                <LoginPage />
            }
          </Route>

          {/* Dashboard page */}
          <Route exact path="/">
            {
              userState ?
                <DashboardPage />
                :
                <LoginPage />
            }
          </Route>

          <Route>
            <h1>404 you did a goof</h1>
          </Route>
        </Switch>
      </>
    </Router>
  );
}
