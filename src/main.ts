import loginPage from './views/loginPage/loginPage';
import registerPage from './views/registerPage/registerPage';
import gamePage from './views/gamePage/gamePage';
import dashboardPage from './views/dashboardPage/dashboardPage';

const routeManager = () => {
  switch (window.location.pathname) {
    case '/login':
      return loginPage();
    case '/register':
      return registerPage();
    case '/dashboard':
      return dashboardPage();
    case '/game':
      return gamePage();
    default:
      return '<h1>404 Not Found</h1>';
  }
}

document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', `
  <div class="container">
    ${routeManager()}
  </div>
`);
