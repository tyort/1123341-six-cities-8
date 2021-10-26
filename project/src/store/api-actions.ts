import {ThunkActionResult} from '../types/action';
import {Offer} from '../types/offer';
import {loadOffersAction, requireAuthorization, requireLogout} from './action';
import {saveToken, dropToken, Token} from '../services/token';
import {APIRoute, AuthorizationStatus} from '../const';
import {AuthUserData} from '../types/auth-user-data';

// ThunkActionResult - расширенный нами тип ThunkAction от redux-thunk
export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(loadOffersAction(data));
  };

// Обращение к определенного API в целях проверки статуса авторизации пользователя
export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      // в случае успеха, т.е. promise зарезолвится
      .then(() => {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      });
  };

// Авторизация пользователя
export const loginAction = ({login: email, password}: AuthUserData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout); // закрыть сессию на сервере
    dropToken();
    dispatch(requireLogout());
  };
