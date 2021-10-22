import {ActionsType, ActionName} from '../types/action';
import {offers, cities} from '../mocks/offers';
import {State} from '../types/state';
import {Offer, City} from '../types/offer';

const SORT_NAME_DEFAULT = 'Popular';
const CITY_DEFAULT = {
  latitude: 48.86,
  longitude: 2.35,
  title: 'Paris',
  zoom: 12,
};

const sortOffers = (proffer: Offer[], sortName: string, city: City): Offer[] => {
  switch (sortName) {
    case 'Price: low to high':
      return proffer.slice().sort((a, b) => a.price - b.price);
    case 'Price: high to low':
      return proffer.slice().sort((a, b) => b.price - a.price);
    case 'Top rated first':
      return proffer.slice().sort((a, b) => b.rating - a.rating);
    default:
      // Чтобы выдать порядок какой был на сервере
      return offers.filter((item) => item.city === city.title);
  }
};

// Начальное значение {объект города, массив списка предложений, название сортировки}
const initialOffers = offers.filter((item) => item.city === CITY_DEFAULT.title);
const initialState = {city: CITY_DEFAULT, offersList: initialOffers, sortName: SORT_NAME_DEFAULT};

//               state: {объект города, массив списка предложений}
//               action: {type: 'название', payload: переменная с компонента}
const reducer = (state: State = initialState, action: ActionsType): State => {
  switch (action.type) {
    case ActionName.ChangeCity:
      return {
        ...state,
        city: cities.find((town) => town.title === action.payload) || CITY_DEFAULT,
        offersList: offers.filter((item) => item.city === action.payload),
      };
    case ActionName.ChangeSortName:
      return {
        ...state,
        sortName: action.payload,
        offersList: sortOffers(state.offersList, action.payload, state.city),
      };
    default:
      return state;
  }
  //return: {объект города, массив списка предложений}
};

export {reducer};
