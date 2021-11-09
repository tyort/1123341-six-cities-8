import {render, screen, waitFor} from '@testing-library/react';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {createAPI} from '../../services/api';
import FavoriteScreen from './favorites';
import {makeFakeFavoriteOffers} from '../../utils/mocks';

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockOffers = makeFakeFavoriteOffers();

const store = mockStore({
  OFFERS: {
    allOffers: mockOffers,
  },
});

describe('Component: FavoriteScreen', () => {
  it('should render "FavoriteScreen" when user navigate to "/favorites" url', async () => {
    render(
      <Provider store={store}>
        <FavoriteScreen />
      </Provider>,
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByText(/Brussels|Hamburg|Cologne|Amsterdam|Dusseldorf|Paris/i))
        .toBeInstanceOf(Array);
      expect(screen.getAllByText(/Brussels|Hamburg|Cologne|Amsterdam|Dusseldorf|Paris/i))
        .toHaveLength(6);
    });
  });
});
