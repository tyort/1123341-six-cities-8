import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Offer} from '../../types/offer';
import {City} from '../../types/city';
import {SortName} from '../../const';

export const getAllOffers = (state: State): Offer[] => state[NameSpace.offers].allOffers;
export const getSortedOffersInCity = (state: State): Offer[] => state[NameSpace.offers].currentOffers;
export const getAllCities = (state: State): City[] => state[NameSpace.offers].cities;
export const getOffersLoadStatus = (state: State): boolean => state[NameSpace.offers].isDataLoaded;
export const getCurrentCity = (state: State): City | undefined => state[NameSpace.offers].city;
export const getCurrentSortName = (state: State): SortName => state[NameSpace.offers].sortName;
