import { Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useNavigate, useRoutes } from 'react-router-dom';
import routes from '~react-pages';
import { useAtom } from 'jotai';
import { userAtom } from './scripts/atoms/state';
import { getUser } from './services/userService';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
const queryClient = new QueryClient();
const queryOptions = {
  refetchOnWindowFocus: false,
  keepPreviousData: true
};
queryClient.setDefaultOptions({ queries: queryOptions });

app.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>
);
