import {ActionsType, ActionName, ChangeSortPayload} from '../types/action';
import {offers, cities} from '../mocks/offers';
import {State} from '../types/state';
import {Offer} from '../types/offer';
import {City} from '../types/city';

const SORT_NAME_DEFAULT = 'Popular';
const CITY_DEFAULT = {
  latitude: 48.86,
  longitude: 2.35,
  title: 'Paris',
  zoom: 12,
};

const sortOffers = (proffer: Offer[], sortName: ChangeSortPayload, city: City): Offer[] => {
  switch (sortName) {
    case 'Price: low to high':
      return proffer.slice().sort((a, b) => a.price - b.price);
    case 'Price: high to low':
      return proffer.slice().sort((a, b) => b.price - a.price);
    case 'Top rated first':
      return proffer.slice().sort((a, b) => b.rating - a.rating);
    default:
      // ??????Чтобы выдать порядок какой был на сервере
      return offers.filter((item) => item.city === city.title);
  }
};

// Начальное значение {объект города, массив списка предложений, название сортировки}
const initialOffers = offers.filter((item) => item.city === CITY_DEFAULT.title);
const initialState = {
  city: CITY_DEFAULT,
  offersList: initialOffers,
  sortName: SORT_NAME_DEFAULT as ChangeSortPayload,
  cities,
};

//               state: {объект города, массив списка предложений}
//               action: {type: 'название', payload: переменная с компонента}
const reducer = (state: State = initialState, action: ActionsType): State => {
  switch (action.type) {
    case ActionName.ChangeCity: {
      const city = cities.find((town) => town.title === action.payload) as City;
      const offersList = offers.filter((item) => item.city === city.title);

      return {
        ...state,
        city,
        offersList,
        sortName: SORT_NAME_DEFAULT,
      };
    }
    case ActionName.ChangeSortName: {
      const offersList = sortOffers(state.offersList, action.payload, state.city);

      return {
        ...state,
        sortName: action.payload,
        offersList,
      };
    }

    case ActionName.LoadOffers: {
      return {...state, offersList: offers}; //?????? offers
    }

    default:
      return state;
  }
  //return: {объект города, массив списка предложений}
};

export {reducer};
