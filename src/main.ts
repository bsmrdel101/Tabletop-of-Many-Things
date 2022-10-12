import loginPage from './views/loginPage';
import registerPage from './views/registerPage';
import dashboardPage from './views/dashboardPage';

const routeManager = () => {
  switch (window.location.pathname) {
    case '/login':
      return loginPage();
    case '/register':
      return registerPage();
    case '/game':
      return dashboardPage();
    default:
      return '<h1>404 Not Found</h1>';
  }
}

document.querySelector<HTMLDivElement>('#app').insertAdjacentHTML('beforeend', `
  <div class="container">
    ${routeManager()}
  </div>
`);
