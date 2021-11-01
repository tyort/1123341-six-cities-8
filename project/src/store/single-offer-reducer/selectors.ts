import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Offer} from '../../types/offer';
import {Comment} from '../../types/comment';

export const getOfferComments = (state: State): Comment[] => state[NameSpace.offer].comments;
export const getOfferNearbies = (state: State): Offer[] => state[NameSpace.offer].nearbyOffers;
