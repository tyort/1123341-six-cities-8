import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {AuthorizationStatus, SortName, AppRoute} from '../../const';
import {makeFakeOffers, makeFakeComments, cities} from '../../utils/mocks';
import App from './app';

const mockStore = configureMockStore();
const mockOffers = makeFakeOffers();
const mockComments = makeFakeComments();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
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

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Popular/i)).toBeInstanceOf(Array);
    expect(screen.getAllByText(/Popular/i)).toHaveLength(2);
    expect(screen.getAllByText(/Brussels|Hamburg|Cologne|Amsterdam|Dusseldorf|Paris/i))
      .toBeInstanceOf(Array);
    expect(screen.getAllByText(/Brussels|Hamburg|Cologne|Amsterdam|Dusseldorf|Paris/i))
      .toHaveLength(7);
    expect(screen.getByText(new RegExp(`to stay in ${cities[2].name}`, 'i'))).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);
    render(fakeApp);

    expect(screen.getByText(/Amsterdam/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Sign in/i)).toHaveLength(2);
    expect(screen.getAllByText(/Sign in/i)).toBeInstanceOf(Array);
    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
  });

  // Проблема в асинхронности:
  // it('should render private "FavoritesScreen" when user navigate to "/favorites"', () => {
  //   history.push(AppRoute.Favorites);
  //   render(fakeApp);

  //   expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  //   ????? предложения загружаются через асинхронное действие
  //   Поэтому проверить города надо по-особенному
  // });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });

  // it('should render "PlaceOfferScreenWrapped" when user navigate to /offer/:offerId', () => {
  // ?????? Непонятно как реализовывать, как выбрать id, и нужно ли учитывать асинхронность
  // });
});
