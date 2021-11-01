import {ActionsType} from '../../types/action';
import {ActionName, SortName} from '../../const';
import {State} from '../../types/state';
import {Offer} from '../../types/offer';
import {City} from '../../types/city';
import {AuthorizationStatus} from '../../const';

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
      // ??????Чтобы выдать порядок какой был на сервере
      return proffer.slice().filter((item) => item.city.name === city.name);
  }
};

const initialState = {
  city: undefined,
  currentOffers: [],
  allOffers: [],
  sortName: SortName.Popular,
  cities: [],
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
      const currentOffers = state.allOffers.filter((item) => item.city.name === city.name);

      return {
        ...state,
        city,
        currentOffers,
        sortName: SortName.Popular,
      };
    }
    case ActionName.ChangeSortName: {
      const currentOffers = state.sortName !== SortName.Popular
        ? sortOffers(state.currentOffers, action.payload, state.city as City)
        : sortOffers(state.allOffers, action.payload, state.city as City);

      return {
        ...state,
        sortName: action.payload,
        currentOffers,
      };
    }

    case ActionName.LoadOffers: {
      const {offers: allOffers} = action.payload;
      const citiesJSON = allOffers.map((item) => JSON.stringify(item.city));
      const cities = [...new Set(citiesJSON)].map((item) => JSON.parse(item));
      const oneOffer = allOffers.find((item) => item.city.name === CITY_NAME_DEFAULT);
      const city = oneOffer && oneOffer.city;
      const currentOffers = allOffers.filter((item) => item.city.name === (city as City).name);

      return {...state, allOffers, currentOffers, cities, city, isDataLoaded: true};
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
      return {...state, authorizationStatus: action.payload};

    case ActionName.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};

    default:
      return state;
  }
};

export {reducer};
