import {ActionsType, ActionName} from '../types/action';
import {offers, city} from '../mocks/offers';
import {State} from '../types/state';

const initialState = {city, offersList: offers}; // Начальное значение {объект города, массив списка предложений}

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
