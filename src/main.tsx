import { Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useNavigate, useRoutes } from 'react-router-dom';
import routes from '~react-pages';
import Layout from './components/Layout';
import { useAtom } from 'jotai';
import { userAtom } from './atoms/state';
import { getUser } from './controllers/userController';
import './styles/index.scss';


export function App() {
  const navigate = useNavigate();
  const [user, setUser] = useAtom<User>(userAtom);

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
      <Layout>
        { useRoutes(routes) }
      </Layout>
    </Suspense>
  );
}


const app = createRoot(document.getElementById('root')!);

app.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
