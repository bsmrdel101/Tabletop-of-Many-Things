import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from '~react-pages';
import './styles/index.scss';


export function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {useRoutes(routes)}
    </Suspense>
  );
}

const app = createRoot(document.getElementById('root')!);

app.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
