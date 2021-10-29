import {ThunkActionResult} from '../types/action';
import {Offer} from '../types/offer';
import {Comment, NewComment} from '../types/comment';
import {loadOffersAction, loadNearbyAction, loadCommentsAction, requireAuthorization, requireLogout, redirectToRoute} from './action';
import {saveToken, dropToken, Token} from '../services/token';
import {APIRoute, AuthorizationStatus,  AppRoute} from '../const';
import {AuthUserData} from '../types/auth-user-data';

// ThunkActionResult - расширенный нами тип ThunkAction от redux-thunk
export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    // к основному адресу BACKEND_URL приписываем '/hotels'(APIRoute.Offers)
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(loadOffersAction(data));
  };

export const fetchCommentsAction = (offerId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
    dispatch(loadCommentsAction(data));
  };

export const fetchNearbyAction = (offerId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    dispatch(loadNearbyAction(data));
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
export const loginAction = ({email, password}: AuthUserData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout); // закрыть сессию на сервере
    dropToken(); // удалит токен из браузера
    dispatch(requireLogout());
  };

export const setCommentAction = ({offerId, comment, rating}: NewComment): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.post(`${APIRoute.Comments}/${offerId}`, {comment, rating});
    dispatch(loadCommentsAction(data));
  };
