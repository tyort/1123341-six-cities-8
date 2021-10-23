import {ActionsType, ActionName} from '../types/action';
import {offers, cities} from '../mocks/offers';
import {State} from '../types/state';

const CITY_DEFAULT = {
  latitude: 48.86,
  longitude: 2.35,
  title: 'Paris',
  zoom: 12,
};

// Начальное значение {объект города, массив списка предложений}
const initialOffers = offers.filter((item) => item.city === CITY_DEFAULT.title);
const initialState = {city: CITY_DEFAULT, offersList: initialOffers};

// Возвращает и принимает в качестве
//               state: {объект города, массив списка предложений}
//               action: {тип возвращаемого объекта от store/action}
// ..............return: {объект города, массив списка предложений}
const reducer = (state: State = initialState, action: ActionsType): State => {
  const currentCityName = action.payload || CITY_DEFAULT.title;
  const offersList = offers.filter((item) => item.city === currentCityName);
  const city = cities.find((town) => town.title === action.payload) || CITY_DEFAULT;

  switch (action.type) {
    case ActionName.ChangeCity:
      return {...state, city, offersList};
    default:
      return state;
  }
};

export {reducer};
