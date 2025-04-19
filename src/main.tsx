import { Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from '~react-pages';
import Layout from './components/Layout';
import { useAtom } from 'jotai';
import { userAtom } from './atoms/state';
import './styles/index.scss';


export function App() {
  const [user, setUser] = useAtom<User>(userAtom);

  useEffect(() => {
    const fetchData = async () => {
      setUser({ id: 1, username: 'dev' }); // TODO: Fetch user data
    };
    fetchData();
  }, []);

  const pages = useRoutes(routes); 


  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Layout>
        {user.id > 0 ?
          <>{pages}</>
          :
          <p>Login Page</p> // TODO: Add user login/register pages
        }
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
