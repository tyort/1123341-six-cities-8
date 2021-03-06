import {Offer} from '../types/offer';
import {Comment} from '../types/comment';
import {AppRoute, AuthorizationStatus, ActionName, SortName} from '../const';
import {createAction} from '@reduxjs/toolkit';

export const changeCityAction = createAction(
  ActionName.ChangeCity,
  (cityName: string) => ({payload: cityName}),
);

export const changeSortNameAction = createAction(
  ActionName.ChangeSortName,
  (sortName: SortName) => ({payload: sortName}),
);

export const loadOffersAction = createAction(
  ActionName.LoadOffers,
  (offers: Offer[]) => ({payload: offers}),
);

export const loadFavoritesAction = createAction(
  ActionName.LoadFavorites,
  (offers: Offer[]) => ({payload: offers}),
);

export const setFailedPostAction = createAction(
  ActionName.SetPostFailed,
  (isFailed: boolean) => ({payload: isFailed}),
);

export const loadCurrentOfferAction = createAction(
  ActionName.LoadCurrentOffer,
  (offer: Offer) => ({payload: offer}),
);

export const loadCommentsAction = createAction(
  ActionName.LoadComments,
  (comments: Comment[]) => ({payload: comments}),
);

export const loadNearbyAction = createAction(
  ActionName.LoadNearby,
  (nearbyOffers: Offer[]) => ({payload: nearbyOffers}),
);

export const setFavoriteAction = createAction(
  ActionName.ChangeFavorite,
  (offer: Offer) => ({payload: offer}),
);

export const setEmailAction = createAction(
  ActionName.SetEmail,
  (email: string) => ({payload: email}),
);

export const requireAuthorization = createAction(
  ActionName.RequireAuthorization,
  (authorizationStatus: AuthorizationStatus) => ({payload: authorizationStatus}),
);

export const requireLogout = createAction(ActionName.RequireLogout);


export const redirectToRoute = createAction(
  ActionName.RedirectToRoute,
  (url: AppRoute) => ({payload: url}),
);
