import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Offer} from '../../types/offer';
import {Comment} from '../../types/comment';

export const getOfferComments = (state: State): Comment[] => state[NameSpace.Offer].comments;
export const getOfferNearbies = (state: State): Offer[] => state[NameSpace.Offer].nearbyOffers;
export const getCurrentOffer = (state: State): Offer | null => state[NameSpace.Offer].currentOffer;
export const getPostStatus = (state: State): boolean => state[NameSpace.Offer].isPostFailed;
