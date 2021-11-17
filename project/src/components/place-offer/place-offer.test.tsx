import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import PlaceOfferScreen from './place-offer';
import {makeFakeFavoriteOffers, makeFakeOffer, makeFakeComments} from '../../utils/mocks';
import {AuthorizationStatus} from '../../const';
import {createAPI} from '../../services/api';
import {State} from '../../types/state';

const mockComments = makeFakeComments();
const mockOffers = makeFakeFavoriteOffers();
const mockOffer = makeFakeOffer();

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
State,
Action,
ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  OFFER: {
    comments: mockComments,
    nearbyOffers: mockOffers,
  },
});

describe('Component: PlaceOfferScreen', () => {
  it('should render "PlaceOfferScreen" when user navigate to "/offer/:offerId" url', async () => {
    render(
      <Provider store={store}>
        <PlaceOfferScreen
          currentOffer={mockOffer}
          renderCard={jest.fn(() => <h1>Fake Offer Card</h1>)}
          renderMap={jest.fn(() => <h1>Fake Map</h1>)}
        />
      </Provider>,
    );

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockOffer.title, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Fake Offer Card/i)).toBeInTheDocument();
    expect(screen.getByText(/Fake Map/i)).toBeInTheDocument();
  });
});
