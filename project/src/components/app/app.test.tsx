import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen, waitFor} from '@testing-library/react';
import thunk from 'redux-thunk';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import {createAPI} from '../../services/api';
import {Provider} from 'react-redux';
import {AuthorizationStatus, SortName, AppRoute} from '../../const';
import {makeFakeFavoriteOffers, makeFakeComments, cities} from '../../utils/mocks';
import App from './app';

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockOffers = makeFakeFavoriteOffers();
const mockComments = makeFakeComments();

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
    email: 'what@mail.ru',
  },
  OFFERS: {
    city: cities[2],
    allOffers: mockOffers,
    currentOffers: mockOffers,
    sortName: SortName.Popular,
    cities,
    isDataLoaded: true,
  },
  OFFER: {comments: mockComments, nearbyOffers: mockOffers},
});

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    {/* Не смотря на то, что на продакшне App обернут в другой тип роутера */}
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(new RegExp(`${mockOffers.length} places to stay in ${cities[2].name}`, 'i'))).toBeInTheDocument();

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Popular/i)).toBeInstanceOf(Array);
    expect(screen.getAllByText(/Popular/i)).toHaveLength(2);

    userEvent.click(screen.getByTestId(/option-open/i));
    expect(screen.getByTestId(/sort-list/i)).toHaveClass('places__options--opened');

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();

    expect(screen.getAllByText(/Brussels|Hamburg|Cologne|Amsterdam|Dusseldorf|Paris/i))
      .toBeInstanceOf(Array);
    expect(screen.getAllByText(/Brussels|Hamburg|Cologne|Amsterdam|Dusseldorf|Paris/i))
      .toHaveLength(7);
  });

  it('should render "LoginScreen" when authorised user navigate to "/login" url', () => {
    history.push('/login');
    render(fakeApp);
    expect(screen.getByText(new RegExp(`${mockOffers.length} places to stay in ${cities[2].name}`, 'i'))).toBeInTheDocument();
  });

  it('should render private "FavoritesScreen" when user navigate to "/favorites"', async () => {
    history.push(AppRoute.Favorites);
    render(fakeApp);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByText(/Brussels|Hamburg|Cologne|Amsterdam|Dusseldorf|Paris/i))
        .toBeInstanceOf(Array);
      expect(screen.getAllByText(/Brussels|Hamburg|Cologne|Amsterdam|Dusseldorf|Paris/i))
        .toHaveLength(6);
    });
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });

  it('should render "PlaceOfferScreenWrapped" when user navigate to /offer/:offerId', async () => {
    history.push(`/offer/${mockOffers[0].id}`);
    render(fakeApp);

    await waitFor(() => {
      expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
      expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
      expect(screen.getAllByText(new RegExp(mockOffers[0].title, 'i'))).toBeInstanceOf(Array);
    });
  });
});
