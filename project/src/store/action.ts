import {Offer} from '../types/offer';
import {Comment} from '../types/comment';
import {AppRoute, AuthorizationStatus} from '../const';

import {
  ActionName,
  ChangeCityPayload,
  ChangeSortPayload
} from '../types/action';

// аргументы попадают из диспатча
export const changeCityAction = (cityName: ChangeCityPayload) => ({
  type: ActionName.ChangeCity,
  payload: cityName,
} as const);

export const changeSortNameAction = (sortName: ChangeSortPayload) => ({
  type: ActionName.ChangeSortName,
  payload: sortName,
} as const);

export const loadOffersAction = (offers: Offer[]) => ({
  type: ActionName.LoadOffers,
  payload: {
    offers,
  },
} as const);

export const loadCommentsAction = (comments: Comment[]) => ({
  type: ActionName.LoadComments,
  payload: {
    comments,
  },
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionName.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionName.RequireLogout,
} as const);

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionName.RedirectToRoute,
  payload: url,
} as const);

