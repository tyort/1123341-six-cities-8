import {render, screen} from '@testing-library/react';
import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import LoginScreen from './login';
import {AuthorizationStatus} from '../../const';
import { cities } from '../../utils/mocks';

const mockStore = configureMockStore();

describe('Component: LoginScreen', () => {
  it('should render "LoginScreen" when non-authorised user navigate to "/login" url', () => {
    const history = createMemoryHistory();
    history.push('/login');

    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
      OFFERS: {city: cities[2]},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Cologne/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Sign in/i)).toHaveLength(2);
    expect(screen.getAllByText(/Sign in/i)).toBeInstanceOf(Array);
    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('email'), 'keks');
    userEvent.type(screen.getByTestId('password'), '123456');

    expect(screen.getByDisplayValue(/keks/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });

  it('should render "LoginScreen" when authorised user navigate to "/login" url', () => {
    const history = createMemoryHistory();
    history.push('/login');

    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      OFFERS: {city: cities[2]},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/login" exact>
              <LoginScreen/>
            </Route>
            <Route path="/" exact>
              <h1>This is main page</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
