import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {Router, Switch, Route, BrowserRouter} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import HeaderScreen from './header-user';
import {AuthorizationStatus} from '../../const';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: HeaderScreen', () => {
  it('should render "HeaderScreen" correctly when user authorised', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        email: 'what@mail.ru',
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <HeaderScreen/>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should render "HeaderScreen" correctly when user non-authorised', async () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        email: 'what@mail.ru',
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/" exact>
              <HeaderScreen/>
            </Route>
            <Route path="/login" exact>
              <h1>You have to be authorised</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Sign in/i));
    expect(screen.getByText(/You have to be authorised/i)).toBeInTheDocument();
  });
});