/* eslint-disable camelcase */
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../types/state';
import {fetchCommentsAction, checkAuthAction, loginAction, fetchOffersAction, changeFavoriteAction,
  logoutAction, fetchFavoritesAction, fetchNearbyAction, setCommentAction} from './api-actions';

import {loadCommentsAction, loadFavoritesAction, requireAuthorization, redirectToRoute,
  loadOffersAction, requireLogout, loadNearbyAction, setFavoriteAction} from './action';

import {APIRoute, AuthorizationStatus, AppRoute} from '../const';
import {AuthUserData} from '../types/auth-user-data';
import {makeFakeOffers, makeFakeOffer, makeFakeComments, makeFakeComment} from '../utils/mocks';

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();

  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthUserData = {email: 'test@test.ru', password: '123456'};
    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});

    const store = mockStore();

    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
      redirectToRoute(AppRoute.Main),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
  });

  it('should dispatch action "offers/loadOffers" when GET /hotels', async () => {
    const mockFakeOffers = makeFakeOffers();
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockFakeOffers);

    const store = mockStore();
    await store.dispatch(fetchOffersAction());

    expect(store.getActions()).toEqual([
      loadOffersAction(mockFakeOffers),
    ]);
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    expect(store.getActions()).toEqual([requireLogout()]);
    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });

  it('should dispatch action "offers/loadFavorites" when GET /favorite', async () => {
    const mockFakeOffers = makeFakeOffers();
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockFakeOffers);

    const store = mockStore();
    await store.dispatch(fetchFavoritesAction());

    expect(store.getActions()).toEqual([
      loadFavoritesAction(mockFakeOffers),
    ]);
  });

  it('should dispatch action "offer/loadComments" when GET /comments/:offerId', async () => {
    const mockFakeComments = makeFakeComments();
    mockAPI
      .onGet(`${APIRoute.Comments}/2`)
      .reply(200, mockFakeComments);

    const store = mockStore();
    await store.dispatch(fetchCommentsAction(2));

    expect(store.getActions()).toEqual([
      loadCommentsAction(mockFakeComments),
    ]);
  });

  it('should dispatch action "offer/loadNearbyOffers" when GET /hotels/:offerId/nearby', async () => {
    const mockFakeOffers = makeFakeOffers();
    mockAPI
      .onGet(`${APIRoute.Offers}/2/nearby`)
      .reply(200, mockFakeOffers);

    const store = mockStore();
    await store.dispatch(fetchNearbyAction(2));

    expect(store.getActions()).toEqual([
      loadNearbyAction(mockFakeOffers),
    ]);
  });

  it('should dispatch action "offer/loadComments" when POST /comments/:offerId', async () => {
    const newComment = {offerId: 3, comment: 'Are you kidding?', rating: 5};

    const mockFakeComment = [{
      ...makeFakeComment(),
      id: newComment.offerId,
      comment: newComment.comment,
      rating: newComment.rating,
    }];

    mockAPI
      .onPost(`${APIRoute.Comments}/3`)
      .reply(200, mockFakeComment);

    const store = mockStore();
    await store.dispatch(setCommentAction(newComment));

    expect(store.getActions()).toEqual([
      loadCommentsAction(mockFakeComment),
    ]);
  });

  it('should dispatch action "offer/isFavorite" when POST /favorite/:offerId/:status', async () => {
    const favoriteOffer = makeFakeOffer();

    mockAPI
      .onPost(`${APIRoute.Favorite}/${favoriteOffer.id}/1`)
      .reply(200, {...favoriteOffer, is_favorite: true});

    const store = mockStore();
    await store.dispatch(changeFavoriteAction({...favoriteOffer, is_favorite: true}));

    expect(store.getActions()).toEqual([
      setFavoriteAction({...favoriteOffer, is_favorite: true}),
    ]);
  });
});
