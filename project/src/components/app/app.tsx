import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {AppRoute} from '../../const';
import MainScreen from '../main/main';
import FavoritesScreen from '../favorites/favorites';
import LoginScreen from '../login/login';
import PlaceOfferScreen from '../place-offer/place-offer';
import NotFoundScreen from '../not-found/not-found';

type AppScreenProps = {
  places: string[];
}


function App(props: AppScreenProps): JSX.Element {
  const {places} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainScreen places={places} />
        </Route>
        <Route exact path={AppRoute.Favorites}>
          <FavoritesScreen/>
        </Route>
        <Route exact path={AppRoute.SignIn}>
          <LoginScreen/>
        </Route>
        <Route exact path={AppRoute.Room}>
          <PlaceOfferScreen/>
        </Route>
        <Route>
          <NotFoundScreen/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
