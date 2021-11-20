import {PropsWithChildren} from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import {AppRoute, AuthorizationStatus} from '../../const';
import {getAuthorizationStatus} from '../../store/auth-reducer/selectors';

type PrivateRouteScreenProps = RouteProps & PropsWithChildren<{
  authorizationStatus: AuthorizationStatus;
}>

const mapStateToProps = (state: State) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PrivateRouteScreenProps;

function PrivateRouteScreen(props: ConnectedComponentProps): JSX.Element {
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

export {PrivateRouteScreen};
export default connector(PrivateRouteScreen);
