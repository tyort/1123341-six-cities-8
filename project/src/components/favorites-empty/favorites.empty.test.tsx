import {render, screen} from '@testing-library/react';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {createAPI} from '../../services/api';
import FavoriteScreen from './favorites-empty';
import {AuthorizationStatus} from '../../const';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const store = mockStore({
  OFFERS: {
    allOffers: [],
  },
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
    email: 'what@mail.ru',
  },
});

describe('Component: FavoriteScreen', () => {
  it('should render "FavoriteScreen" when user navigate to "/favorites" url', async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoriteScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });
});
