import {createReducer} from '@reduxjs/toolkit';
import {AuthState} from '../../types/state';
import {requireAuthorization, requireLogout} from '../action';
import {AuthorizationStatus} from '../../const';

export const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});

export {authReducer};
