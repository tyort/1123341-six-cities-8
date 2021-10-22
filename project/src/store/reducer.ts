import {ActionsType, ActionName} from '../types/action';
import {offers, cities} from '../mocks/offers';
import {State} from '../types/state';

const SORT_NAME_DEFAULT = 'Popular';
const CITY_DEFAULT = {
  latitude: 48.86,
  longitude: 2.35,
  title: 'Paris',
  zoom: 12,
};

// Начальное значение {объект города, массив списка предложений, название сортировки}
const initialOffers = offers.filter((item) => item.city === CITY_DEFAULT.title);
const initialState = {city: CITY_DEFAULT, offersList: initialOffers, sortName: SORT_NAME_DEFAULT};

//               state: {объект города, массив списка предложений}
//               action: {type: 'название', payload: переменная с компонента}
const reducer = (state: State = initialState, action: ActionsType): State => {
  const city = cities.find((town) => town.title === action.payload) || CITY_DEFAULT;
  const offersList = offers.filter((item) => item.city === city.title);

  switch (action.type) {
    case ActionName.ChangeCity:
      return {...state, city, offersList};
    default:
      return state;
  }
  //return: {объект города, массив списка предложений}
};

export {reducer};
