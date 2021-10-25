import {
  changeCityAction,
  changeSortNameAction,
  loadOffersAction,
  requireAuthorization,
  requireLogout
} from '../store/action';

export enum ActionName {
  ChangeCity = 'offers/changeCity',
  ChangeSortName = 'offers/changeSortName',
  LoadOffers = 'offers/loadOffers',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout'
}

export type ChangeCityPayload =
| 'Paris'
| 'Cologne'
| 'Brussels'
| 'Amsterdam'
| 'Hamburg'
| 'Dusseldorf'

export type ChangeSortPayload =
| 'Popular'
| 'Price: low to high'
| 'Price: high to low'
| 'Top rated first'

export type ActionsType =
| ReturnType<typeof changeCityAction>
| ReturnType<typeof changeSortNameAction>
| ReturnType<typeof loadOffersAction>
| ReturnType<typeof requireAuthorization>
| ReturnType<typeof requireLogout>

