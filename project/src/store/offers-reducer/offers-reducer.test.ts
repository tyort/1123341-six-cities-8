/* eslint-disable camelcase */
import {offersReducer, initialState} from './offers-reducer';
import {changeCityAction, changeSortNameAction, loadOffersAction, loadFavoritesAction, setFavoriteAction} from '../action';
import {OffersState} from '../../types/state';
import {cities, makeFakeOffers} from '../../utils/mocks';
import {CityName, SortName} from '../../const';
import {Offer} from '../../types/offer';

const mockFakeOffers = makeFakeOffers();
describe('Reducer: offersReducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(offersReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });
  it('should change city`s feature by a given value', () => {
    const state: OffersState = {...initialState, cities};
    expect(offersReducer(state, changeCityAction(CityName.Brussels)))
      .toEqual({...state, city: cities[0]});
  });
  it('should change sorting name by a given value', () => {
    const state: OffersState = initialState;
    expect(offersReducer(state, changeSortNameAction(SortName.PriceAscending)))
      .toEqual({...state, sortName: 'Price: low to high'});
  });
  it('should update state.allOffers by load offers from server', () => {
    const state: OffersState = {...initialState, allOffers: [], isDataLoaded: false};
    expect(offersReducer(state, loadOffersAction(mockFakeOffers)))
      .toMatchObject({allOffers: mockFakeOffers, isDataLoaded: true});
  });
  it('should update all offers list if we upload favorite offers from server', () => {
    const state: OffersState = {...initialState, allOffers: mockFakeOffers};
    const favoriteOffers: Offer[] = [
      {...mockFakeOffers[0], is_favorite: true},
      {...mockFakeOffers[2], is_favorite: true},
    ];
    const changedState: OffersState = offersReducer(state, loadFavoritesAction(favoriteOffers));
    expect(changedState.allOffers as Offer[])
      .toEqual(expect.arrayContaining(favoriteOffers as Offer[]));
  });
  it('should update all offers list if we change favorite priority for one offer', () => {
    const state: OffersState = {...initialState, allOffers: mockFakeOffers};
    const favoriteOffer: Offer = {...mockFakeOffers[0], is_favorite: true};
    const changedState: OffersState = offersReducer(state, setFavoriteAction(favoriteOffer));
    expect(changedState.allOffers as Offer[])
      .toEqual(expect.arrayContaining([favoriteOffer as Offer]));
  });
});


