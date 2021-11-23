import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Offer} from '../../types/offer';
import {City} from '../../types/city';
import {SortName} from '../../const';

export const getAllOffers = (state: State): Offer[] => state[NameSpace.Offers].allOffers;
export const getSortedOffersInCity = (state: State): Offer[] => state[NameSpace.Offers].currentOffers;
export const getOffersLoadStatus = (state: State): boolean => state[NameSpace.Offers].isDataLoaded;
export const getCurrentCity = (state: State): City | undefined => state[NameSpace.Offers].city;
export const getCurrentSortName = (state: State): SortName => state[NameSpace.Offers].sortName;
