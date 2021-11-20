/* eslint-disable camelcase */
import {ThunkActionResult} from '../types/action';
import {Offer} from '../types/offer';
import {Comment, NewComment} from '../types/comment';
import {loadOffersAction, loadNearbyAction, loadCommentsAction, loadCurrentOfferAction,
  requireAuthorization, requireLogout, redirectToRoute, setFavoriteAction, loadFavoritesAction, setEmailAction} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AuthorizationStatus,  AppRoute} from '../const';
import {AuthUserData, AuthInfo} from '../types/auth-user-data';
import {toast} from 'react-toastify';

const AUTH_FAIL_MESSAGE = 'Не забудьте авторизоваться';
const EMAIL_FAIL_MESSAGE = 'Введите корректный email';
const POST_DATA_FAIL_MESSAGE = 'Произошла ошибка при отправке данных';
const NEARBY_AS_POSTFIX = 'nearby';

// ThunkActionResult - расширенный нами ThunkAction(middleware) от redux-thunk, возвращающие промис
// async (dispatch, _getState, api):...... - это экшн, только вместо объекта функция
export const fetchOffersAction = (): ThunkActionResult =>
  // dispatch -для отправки действий с хранилищем
  // _getState - текущее состояние хранилища
  async (dispatch, _getState, api): Promise<void> => {

    // После завершения асинхронного запроса...(brb)
    const {data} = await api.get<Offer[]>(APIRoute.Offers); // к BACKEND_URL приписываем '/hotels'(APIRoute.Offers)
    // (brb)...мы можем закинуть данные в хранилище
    dispatch(loadOffersAction(data));
  };

export const fetchFavoritesAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {

    const {data} = await api.get<Offer[]>(APIRoute.Favorite);
    dispatch(loadFavoritesAction(data));
  };

export const fetchCurrentOfferAction = (offerId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
    dispatch(loadCurrentOfferAction(data));
  };

export const fetchCommentsAction = (offerId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
    dispatch(loadCommentsAction(data));
  };

export const fetchNearbyAction = (offerId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/${NEARBY_AS_POSTFIX}`);
    dispatch(loadNearbyAction(data));
  };

// Обращение к определенного API в целях проверки статуса авторизации пользователя
export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.get(APIRoute.Login);
      dispatch(setEmailAction(data.email));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      toast.info(AUTH_FAIL_MESSAGE);
    }
  };

// Авторизация пользователя
export const loginAction = ({email, password}: AuthUserData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.post<AuthInfo>(APIRoute.Login, {email, password});
      saveToken(data.token);
      dispatch(setEmailAction(data.email));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch {
      toast.info(EMAIL_FAIL_MESSAGE);
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout); // закрыть сессию на сервере
    dropToken(); // удалит токен из браузера
    dispatch(requireLogout());
  };

export const setCommentAction = ({offerId, comment, rating}: NewComment): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.post<Comment[]>(`${APIRoute.Comments}/${offerId}`, {comment, rating});
      dispatch(loadCommentsAction(data));
    } catch {
      toast.info(POST_DATA_FAIL_MESSAGE);
    }
  };

export const changeFavoriteAction = ({id, is_favorite}: Offer): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const status = Number(is_favorite);
    const {data} = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${status}`);
    dispatch(setFavoriteAction(data));
  };
