import {createReducer} from '@reduxjs/toolkit';
import {AuthState} from '../../types/state';
import {requireAuthorization, requireLogout, setEmailAction} from '../action';
import {AuthorizationStatus} from '../../const';

export const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  email: 'johndoo@NONAME.com',
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(setEmailAction, (state, action) => {
      state.email = action.payload;
    });
});

export {authReducer};
