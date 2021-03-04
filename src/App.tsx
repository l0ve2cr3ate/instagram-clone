import { lazy, Suspense, FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';

const Login: FC = lazy(() => import('./pages/login'));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>...Loading</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
