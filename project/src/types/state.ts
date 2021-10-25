import {Offer} from '../types/offer';
import {City} from '../types/city';
import {ChangeSortPayload, CurrentAuthStatus} from '../types/action';

export type State = {
  city: City,
  offersList: Offer[],
  sortName: ChangeSortPayload,
  cities: City[],
  authorizationStatus: CurrentAuthStatus,
};
