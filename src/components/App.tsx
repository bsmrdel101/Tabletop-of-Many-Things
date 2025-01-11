import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { getUser } from '../scripts/controllers/userController';
import DashboardPage from '../pages/DashboardPage';
import GamePage from '../pages/GamePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CharactersPage from '../pages/CharactersPage';
import CharacterSheetPage from '../pages/CharacterSheetPage';
import { useAtom } from 'jotai';
import { userAtom } from '../scripts/atoms/state';


export default function App() {
  const [user, setUser] = useAtom<User>(userAtom);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();
      setUser(user);
    };
    fetchData();
  }, []);
  

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          {user ? <Redirect to="/" /> : <LoginPage />}
        </Route>
        <Route exact path="/register">
          <RegisterPage />
        </Route>
        <Route exact path="/game/:room">
          {user ? <GamePage /> : <LoginPage />}
        </Route>
        <Route exact path="/characters">
          {user ? <CharactersPage /> : <LoginPage />}
        </Route>
        <Route exact path="/characters/:id">
          {user ? <CharacterSheetPage /> : <LoginPage />}
        </Route>
        <Route exact path="/">
          {user ? <DashboardPage /> : <LoginPage />}
        </Route>
        <Route>
          <h1>404 you did a goof</h1>
        </Route>
      </Switch>
    </Router>
  );
}
