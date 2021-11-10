import {authReducer, initialState} from './auth-reducer';
import {AuthorizationStatus, ActionName} from '../../const';

describe('Reducer: user', () => {
  it('without additional parameters should return initial state', () => {
    expect(authReducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update authorizationStatus to "AUTH"', () => {
    const state = {authorizationStatus: AuthorizationStatus.NoAuth};
    const requiredAuthorizationAction = {
      type: ActionName.RequireAuthorization,
      payload: AuthorizationStatus.Auth,
    };

    expect(authReducer(state, requiredAuthorizationAction))
      .toEqual({authorizationStatus: AuthorizationStatus.Auth});
  });

  it('should update authorizationStatus to "NO_AUTH"', () => {
    const state = {authorizationStatus: AuthorizationStatus.NoAuth};
    const requiredAuthorizationAction = {
      type: ActionName.RequireAuthorization,
      payload: AuthorizationStatus.NoAuth,
    };

    expect(authReducer(state, requiredAuthorizationAction))
      .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
  });
});
