import {PropsWithChildren} from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import {AppRoute, AuthorizationStatus} from '../../const';

type PrivateRouteProps = RouteProps & PropsWithChildren<{
  authorizationStatus: AuthorizationStatus;
}>

const mapStateToProps = ({USER}: State) => ({
  authorizationStatus: USER.authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PrivateRouteProps;

function PrivateRoute(props: ConnectedComponentProps): JSX.Element {
  const {exact, path, authorizationStatus, children} = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStatus === AuthorizationStatus.Auth
          ? children
          : <Redirect to={AppRoute.SignIn} />
      )}
    />
  );
}

export {PrivateRoute};
export default connector(PrivateRoute);
