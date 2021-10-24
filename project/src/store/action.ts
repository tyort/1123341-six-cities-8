import {Offer} from '../types/offer';

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

