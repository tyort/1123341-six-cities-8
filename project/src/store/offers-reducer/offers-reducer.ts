import {createReducer} from '@reduxjs/toolkit';
import {SortName} from '../../const';
import {changeCityAction, changeSortNameAction, loadOffersAction, setFavoriteAction, loadFavoritesAction} from '../action';
import {Offer} from '../../types/offer';
import {City} from '../../types/city';
import {OffersState} from '../../types/state';

const CITY_NAME_DEFAULT = 'Paris';

const sortOffers = (proffer: Offer[], sortName: SortName, city: City): Offer[] => {
  switch (sortName) {
    case SortName.PriceAscending:
      return proffer.slice().sort((a, b) => a.price - b.price);
    case SortName.PriceDescending:
      return proffer.slice().sort((a, b) => b.price - a.price);
    case SortName.RateDescending:
      return proffer.slice().sort((a, b) => b.rating - a.rating);
    default:
      // Выдать порядок какой был на сервере
      return proffer.slice().filter((item) => item.city.name === city.name);
  }
};

export const initialState: OffersState = {
  city: undefined,
  currentOffers: [],
  allOffers: [],
  sortName: SortName.Popular,
  cities: [],
  isDataLoaded: false,
};

const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.city= state.cities.find((town) => town.name === action.payload);
      state.currentOffers = state.allOffers.filter((item) => item.city.name === (state.city as City).name);
      state.sortName = SortName.Popular;
    })
    .addCase(changeSortNameAction, (state, action) => {
      state.sortName = action.payload;
      state.currentOffers = state.sortName !== SortName.Popular
        ? sortOffers(state.currentOffers, action.payload, state.city as City)
        : sortOffers(state.allOffers, action.payload, state.city as City);
    })
    .addCase(loadOffersAction, (state, action) => {
      state.allOffers = action.payload;
      const citiesJSON = state.allOffers.map((item) => JSON.stringify(item.city));
      state.cities = [...new Set(citiesJSON)].map((item) => JSON.parse(item));
      const oneOffer = state.allOffers.find((item) => item.city.name === CITY_NAME_DEFAULT);
      state.city = oneOffer && oneOffer.city;
      state.currentOffers = state.city
        ? state.allOffers.filter((item) => item.city.name === (state.city as City).name)
        : [];
      state.isDataLoaded = true;
    })
    .addCase(setFavoriteAction, (state, action) => {
      const index = state.allOffers.findIndex((offer) => offer.id === action.payload.id);
      state.allOffers = [...state.allOffers.slice(0, index), action.payload, ...state.allOffers.slice(index + 1)];
      state.currentOffers = state.city
        ? state.allOffers.filter((item) => item.city.name === (state.city as City).name)
        : [];
    })
    .addCase(loadFavoritesAction, (state, action) => {
      action.payload.forEach((favoriteOffer) => {
        const index = state.allOffers.findIndex((offer) => offer.id === favoriteOffer.id);
        state.allOffers = [...state.allOffers.slice(0, index), favoriteOffer, ...state.allOffers.slice(index + 1)];
      });
    });
});

export {offersReducer};
