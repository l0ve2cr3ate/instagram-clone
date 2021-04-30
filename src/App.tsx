import { lazy, Suspense, FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';

import ProtectedRoute from './helpers/protected-route';
import { DashboardProps } from './pages/dashboard';

const Login: FC = lazy(() => import('./pages/login'));
const SignUp: FC = lazy(() => import('./pages/sign-up'));
const NotFound: FC = lazy(() => import('./pages/not-found'));
const Dashboard: FC<DashboardProps> = lazy(() => import('./pages/dashboard'));
const Profile: FC = lazy(() => import('./pages/profile'));

const App: FC = () => {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>...Loading</p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.PROFILE} component={Profile} />
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard user={user} />
            </ProtectedRoute>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
