import {Offer} from '../types/offer';
import {Comment} from '../types/comment';
import {City} from '../types/city';
import {ChangeSortPayload} from '../types/action';
import {AuthorizationStatus} from '../const';

export type State = {
  city: City,
  offersList: Offer[],
  sortName: ChangeSortPayload,
  cities: City[],
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  comments: Comment[],
  nearbyOffers: Offer[]
};
