import { cloneElement, FC, ReactElement } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Firebase from 'firebase/app';
import * as ROUTES from '../constants/routes';

export type ProtectedRouteProps = {
  user: Firebase.User;
  children: ReactElement;
  path: string;
  exact?: boolean;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ user, children, path, exact }) => (
  <Route
    exact={exact}
    path={path}
    render={({ location }) => {
      if (user) return cloneElement<{ user: Firebase.User }>(children, { user });
      if (!user) {
        return <Redirect to={{ pathname: ROUTES.LOGIN, state: { from: location } }} />;
      }

      return null;
    }}
  />
);

export default ProtectedRoute;
