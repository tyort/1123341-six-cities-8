import {
  changeCityAction,
  changeSortNameAction,
  loadOffersAction,
  requireAuthorization,
  requireLogout,
  redirectToRoute,
  loadCommentsAction,
  loadNearbyAction
} from '../store/action';

import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {State} from '../types/state';

export enum ActionName {
  ChangeCity = 'offers/changeCity',
  ChangeSortName = 'offers/changeSortName',
  LoadOffers = 'offers/loadOffers',
  LoadComments = 'offers/loadComments',
  LoadNearby = 'offers/loadNearbyOffers',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'app/redirectToRoute'
}

export enum SortName {
  Popular = 'Popular',
  PriceAscending = 'Price: low to high',
  PriceDescending = 'Price: high to low',
  RateDescending = 'Top rated first'
}

export enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}


export type ActionsType =
| ReturnType<typeof changeCityAction>
| ReturnType<typeof changeSortNameAction>
| ReturnType<typeof loadOffersAction>
| ReturnType<typeof loadNearbyAction>
| ReturnType<typeof loadCommentsAction>
| ReturnType<typeof requireAuthorization>
| ReturnType<typeof requireLogout>
| ReturnType<typeof redirectToRoute>

// Action creator теперь можно создать не только объект(действие),
// Но и этот middleware, который в свою очередь возвращает промис.
// Внутри middleware можно разместить код с побочными действиями.
export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, ActionsType>;

// Чтобы диспатчить экшны из самих компонентов, через mapDispatchToProps
// Интерфейс ThunkAction предусматривает диспатч этого типа
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, ActionsType>;

