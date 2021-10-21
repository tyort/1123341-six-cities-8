import {ActionsType, ActionName} from '../types/action';
import {offers} from '../mocks/offers';
import {State} from '../types/state';

const CITY_DEFAULT = {
  latitude: 48.86,
  longitude: 2.35,
  title: 'Paris',
  zoom: 12,
};

// Начальное значение {объект города, массив списка предложений}
const initialState = {city: CITY_DEFAULT, offersList: offers};

// Возвращает и принимает в качестве
//               state: {объект города, массив списка предложений}
//               action: {тип возвращаемого объекта от store/action}
// ..............return: {объект города, массив списка предложений}
const reducer = (state: State = initialState, action: ActionsType): State => {
  const offersList = offers.filter((item) => item.city === state.city.title);

  switch (action.type) {
    case ActionName.ChangeCity:
      return {...state, city: state.city, offersList};
    default:
      return state;
  }
};

export {reducer};
