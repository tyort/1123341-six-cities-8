import {ActionsType, ActionName, SortName, ChangeSortPayload} from '../types/action';
import {State} from '../types/state';
import {Offer} from '../types/offer';
import {City} from '../types/city';
import {AuthorizationStatus} from '../const';

const SORT_NAME_DEFAULT = 'Popular';
const CITY_DEFAULT = {
  location: {
    latitude: 48.86,
    longitude: 2.35,
    zoom: 12,
  },
  name: 'Paris',
};

const offers: Offer[] = [];

const sortOffers = (proffer: Offer[], sortName: ChangeSortPayload, city: City): Offer[] => {
  switch (sortName) {
    case SortName.PriceAscending:
      return proffer.slice().sort((a, b) => a.price - b.price);
    case SortName.PriceDescending:
      return proffer.slice().sort((a, b) => b.price - a.price);
    case SortName.RateDescending:
      return proffer.slice().sort((a, b) => b.rating - a.rating);
    default:
      // ??????Чтобы выдать порядок какой был на сервере
      return offers.filter((item) => item.city.name === city.name);
  }
};

// Начальное значение {объект города, массив списка предложений, название сортировки}
const initialOffers = offers.filter((item) => item.city.name === CITY_DEFAULT.name);
const citiesJSON = offers.map((item) => JSON.stringify(item.city));
const cities: City[] = [...new Set(citiesJSON)].map((item) => JSON.parse(item));

const initialState = {
  city: CITY_DEFAULT,
  offersList: initialOffers,
  sortName: SORT_NAME_DEFAULT as ChangeSortPayload,
  cities,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  comments: [],
  nearbyOffers: [],
};

//               state: {объект города, массив списка предложений}
//               action: {type: 'название', payload: переменная с компонента}
const reducer = (state: State = initialState, action: ActionsType): State => {
  switch (action.type) {
    case ActionName.ChangeCity: {
      const city = state.cities.find((town) => town.name === action.payload) as City;
      const offersList = offers.filter((item) => item.city.name === city.name);

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
      const {offers: offersList} = action.payload;
      return {...state, offersList};
    }

    case ActionName.LoadComments: {
      const {comments} = action.payload;
      return {...state, comments};
    }

    case ActionName.LoadNearby: {
      const {nearbyOffers} = action.payload;
      return {...state, nearbyOffers};
    }

    case ActionName.RequireAuthorization:
      return {...state, authorizationStatus: action.payload, isDataLoaded: true}; //isDataLoaded: true ???????

    case ActionName.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};

    default:
      return state;
  }
  //return: {объект города, массив списка предложений}
};

export {reducer};
