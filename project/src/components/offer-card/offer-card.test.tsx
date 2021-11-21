import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import {Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {createMemoryHistory} from 'history';
import OfferCardScreen from './offer-card';
import {makeFakeOffer} from '../../utils/mocks';
import {AuthorizationStatus, AppRoute, ScreenType} from '../../const';
import {createAPI} from '../../services/api';
import {State} from '../../types/state';

const mockOffer = makeFakeOffer();
const history = createMemoryHistory();
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
});

describe('Component: OfferCardScreen', () => {
  it('should render several "OfferCardScreen" when user navigate to "/main" url', async () => {
    const onCardHover = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.Main}>
              <OfferCardScreen
                offers={[mockOffer]}
                screenType={ScreenType.Main}
                onCardHover={onCardHover}
              />
            </Route>
            <Route exact path={`/offer/${mockOffer.id}`}>
              <h1>This is place offer screen</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(new RegExp(mockOffer.title, 'i'))).toBeInTheDocument();

    expect(onCardHover).not.toBeCalled();
    userEvent.hover(screen.getByTestId(/offer-article/i));
    expect(onCardHover).toBeCalledTimes(1);
    userEvent.unhover(screen.getByTestId(/offer-article/i));
    expect(onCardHover).toBeCalledTimes(2);
    userEvent.hover(screen.getByTestId(/offer-article/i));
    expect(onCardHover).toBeCalledTimes(3);

    expect(screen.queryByText(/This is place offer screen/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('offer-link'));
    expect(screen.getByText(/This is place offer screen/i)).toBeInTheDocument();
  });
});
