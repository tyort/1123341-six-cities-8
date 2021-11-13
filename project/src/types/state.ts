import {Offer} from '../types/offer';
import {Comment} from '../types/comment';
import {City} from '../types/city';
import {SortName} from '../const';
import {AuthorizationStatus} from '../const';
import {RootState} from '../store/root-reducer';

export type OffersState = {
  city: City | undefined,
  allOffers: Offer[],
  currentOffers: Offer[],
  sortName: SortName,
  cities: City[],
  isDataLoaded: boolean,
};

export type SingleOfferState = {
  comments: Comment[],
  nearbyOffers: Offer[]
}

export type AuthState = {
  authorizationStatus: AuthorizationStatus,
  email: string
};

export type State = RootState;
