import {ActionsType, ActionName} from '../types/action';
import {offers} from '../mocks/offers';
import {State} from '../types/state';

const CITY_DEFAULT = {
  latitude: 48.86,
  longitude: 2.35,
  title: 'Paris',
  zoom: 12,
};
const initialState = {city: CITY_DEFAULT, offersList: offers}; // Начальное значение {объект города, массив списка предложений}

// Возвращает и принимает в качестве стейта === {объект города, массив списка предложений}
const reducer = (state: State = initialState, action: ActionsType): State => {
  switch (action.type) {
    case ActionName.ChangeCity:
      return {...state};
    case ActionName.UpdateOffers:
      return {...state};
    default:
      return state;
  }
};

export {reducer};
