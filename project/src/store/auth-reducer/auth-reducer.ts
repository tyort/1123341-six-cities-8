import {ActionName, ActionsType} from '../../types/action';
import {AuthState} from '../../types/state';
import {AuthorizationStatus} from '../../const';

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

const authReducer = (state = initialState, action: ActionsType): AuthState => {
  switch (action.type) {
    case ActionName.RequireAuthorization:
      return {...state, authorizationStatus: action.payload};

    case ActionName.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};

    default:
      return state;
  }
};

export {authReducer};
