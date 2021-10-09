import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import MainScreen from '../main/main';
import FavoritesScreen from '../favorites/favorites';
import LoginScreen from '../login/login';
import PlaceOfferScreen from '../place-offer/place-offer';
import NotFoundScreen from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import {Offer} from '../../types/offer';

type AppScreenProps = {
  places: string[];
  offers: Offer[];
}

function App(props: AppScreenProps): JSX.Element {
  const {places, offers} = props;
  const [firstOffer] = offers;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainScreen places={places} />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <FavoritesScreen />}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.SignIn}>
          <LoginScreen/>
        </Route>
        <Route exact path={AppRoute.Room}>
          <PlaceOfferScreen
            offer={firstOffer}
          />
        </Route>
        <Route>
          <NotFoundScreen/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
