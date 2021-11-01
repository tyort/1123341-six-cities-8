import {Offer} from '../types/offer';
import {Comment} from '../types/comment';
import {City} from '../types/city';
import {SortName} from '../types/action';
import {AuthorizationStatus} from '../const';

export type State = {
  city: City | undefined,
  allOffers: Offer[],
  currentOffers: Offer[],
  sortName: SortName,
  cities: City[],
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  comments: Comment[],
  nearbyOffers: Offer[]
};

export type SingleOfferState = {
  comments: Comment[],
  nearbyOffers: Offer[]
}

export type AuthState = {
  authorizationStatus: AuthorizationStatus,
};
