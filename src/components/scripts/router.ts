import { createBrowserHistory } from "history";

const history = createBrowserHistory();


export const changeRoute = (route: string) => {
  history.replace(`/#${route}`);
  setTimeout(() => window.location.reload(), 200);
};
