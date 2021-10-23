import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import MainScreen from '../main/main';
import FavoritesScreen from '../favorites/favorites';
import LoginScreen from '../login/login';
import PlaceOfferScreen from '../place-offer/place-offer';
import NotFoundScreen from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import {Offer} from '../../types/offer';
import {City} from '../../types/city';
import withMap from '../../hocs/with-map/with-map';
import {nanoid} from 'nanoid';

const MainScreenWrapped = withMap(MainScreen);
const PlaceOfferScreenWrapped = withMap(PlaceOfferScreen);

type AppScreenProps = {
  offers: Offer[];
  cities: City[];
}

function App(props: AppScreenProps): JSX.Element {
  const {offers, cities} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainScreenWrapped
            isMainScreen
            cities={cities}
          />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <FavoritesScreen offers={offers}/>}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.SignIn}>
          <LoginScreen/>
        </Route>
        {offers.map((offer) => (
          <Route key={nanoid(10)} exact path={`/offer/${offer.id}`}>
            <PlaceOfferScreenWrapped
              currentOffer={offer}
              offers={offers}
              isMainScreen={false}
            />
          </Route>
        ))}
        <Route>
          <NotFoundScreen/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
