import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {nanoid} from 'nanoid';
import browserHistory from '../../browser-history';
// компоненты, хоки
import MainScreen from '../main/main';
import FavoritesScreen from '../favorites/favorites';
import LoginScreen from '../login/login';
import PlaceOfferScreen from '../place-offer/place-offer';
import NotFoundScreen from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import CityScreen from '../city/city';
import SortingScreen from '../sorting/sorting';
import LoadingScreen from '../loading-screen/loading-screen';
import withMap from '../../hocs/with-map/with-map';
// из store
import {changeCityAction, changeSortNameAction} from '../../store/action';
// селекторы
import {getAuthorizationStatus} from '../../store/auth-reducer/selectors';
import {getAllOffers, getSortedOffersInCity, getCurrentCity, getCurrentSortName,
  getAllCities, getOffersLoadStatus} from '../../store/offers-reducer/selectors';

import {City} from '../../types/city';
import {AppRoute, AuthorizationStatus, CityName, SortName} from '../../const';


export const authIsUnknown = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

const MainScreenWrapped = withMap(MainScreen);
const PlaceOfferScreenWrapped = withMap(PlaceOfferScreen);

function App(): JSX.Element {
  const offers = useSelector(getSortedOffersInCity);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isDataLoaded = useSelector(getOffersLoadStatus);
  const city = useSelector(getCurrentCity);
  const currentSortName = useSelector(getCurrentSortName);
  const cities = useSelector(getAllCities);
  const allOffers = useSelector(getAllOffers);

  const dispatch = useDispatch();

  const onCityChoose = (cityName: CityName) => {
    dispatch(changeCityAction(cityName));
  };

  const onSortChoose = (sortName: SortName) => {
    dispatch(changeSortNameAction(sortName));
  };

  if (authIsUnknown(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainScreenWrapped
            offers={offers}
            city={city as City}
            isMainScreen
          >
            <CityScreen
              currentCity={city as City}
              cities={cities}
              onCityChoose={onCityChoose}
            />
            <SortingScreen
              currentSortName={currentSortName}
              onSortChoose={onSortChoose}
            />
          </MainScreenWrapped>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
        >
          <FavoritesScreen
            offers={allOffers}
            cities={cities}
          />
        </PrivateRoute>
        <Route
          exact
          path={AppRoute.SignIn}
        >
          <LoginScreen/>
        </Route>
        {offers.map((offer) => (
          <Route key={nanoid(10)} exact path={`/hotels/${offer.id}`}>
            <PlaceOfferScreenWrapped
              currentOffer={offer}
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
