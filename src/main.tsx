import { Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useNavigate, useRoutes } from 'react-router-dom';
import routes from '~react-pages';
import { useAtom } from 'jotai';
import { userAtom } from './scripts/atoms/state';
import { getUser } from './services/userService';
import './styles/index.scss';


export function App() {
  const navigate = useNavigate();
  const [, setUser] = useAtom<User>(userAtom);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUser();
      if (!res) {
        navigate('/login');
      } else {
        setUser(res);
      }
    };
    fetchData();
  }, []);


  return (
    <Suspense fallback={<p>Loading...</p>}>
      { useRoutes(routes) }
    </Suspense>
  );
}


const app = createRoot(document.getElementById('root')!);

app.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
