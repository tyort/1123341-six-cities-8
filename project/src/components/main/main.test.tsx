import {render, screen} from '@testing-library/react';
import {Router, Switch, Route, BrowserRouter} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import MainScreen from './main';
import {makeFakeOffers, cities} from '../../utils/mocks';
import {AuthorizationStatus} from '../../const';
import userEvent from '@testing-library/user-event';

const mockOffers = makeFakeOffers();
const history = createMemoryHistory();

describe('Component: MainScreen', () => {
  it('should render "MainScreen" when authorised user navigate to "/main" url', async () => {
    const onLogoutHandler = jest.fn();

    render(
      <BrowserRouter>
        <MainScreen
          authorizationStatus={AuthorizationStatus.Auth}
          city={cities[1]}
          offers={mockOffers}
          isMainScreen
          onLogoutHandler={onLogoutHandler}
          renderCard={jest.fn(() => <h1>Fake Offer Card</h1>)}
          renderMap={jest.fn(() => <h1>Fake Map</h1>)}
        />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/Fake Offer Card/i)).toBeInTheDocument();
    expect(screen.getByText(/Fake Map/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Sign out/i));
    expect(onLogoutHandler).toBeCalledTimes(1);
  });

  it('should render "MainScreen" when non-authorised user navigate to "/main" url', async () => {
    const onLogoutHandler = jest.fn();

    render(
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <MainScreen
              authorizationStatus={AuthorizationStatus.NoAuth}
              city={cities[1]}
              offers={mockOffers}
              isMainScreen
              onLogoutHandler={onLogoutHandler}
              renderCard={jest.fn(() => <h1>Fake Offer Card</h1>)}
              renderMap={jest.fn(() => <h1>Fake Map</h1>)}
            />
          </Route>
          <Route path="/login" exact>
            <h1>You have to be authorised</h1>
          </Route>
        </Switch>
      </Router>,
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/Fake Offer Card/i)).toBeInTheDocument();
    expect(screen.getByText(/Fake Map/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Sign in/i));
    expect(screen.getByText(/You have to be authorised/i)).toBeInTheDocument();
  });
});
