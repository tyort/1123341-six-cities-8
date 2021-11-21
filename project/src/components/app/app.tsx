import {Switch, Route} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import MainScreen from '../main/main';
import FavoritesScreen from '../favorites/favorites';
import LoginScreen from '../login/login';
import PlaceOfferScreen from '../place-offer/place-offer';
import NotFoundScreen from '../not-found/not-found';
import NotPlacesScreen from '../not-places/not-places';
import PrivateRouteScreen from '../private-route/private-route';
import CityScreen from '../city/city';
import SortingScreen from '../sorting/sorting';
import LoadingScreen from '../loading/loading';
import HeaderUserScreen from '../header-user/header-user';
import withMap from '../../hocs/with-map/with-map';
import {changeCityAction, changeSortNameAction} from '../../store/action';
import {getAuthorizationStatus} from '../../store/auth-reducer/selectors';
import {getAllOffers, getCurrentCity, getCurrentSortName,
  getOffersLoadStatus, getSortedOffersInCity} from '../../store/offers-reducer/selectors';

import {City} from '../../types/city';
import {AppRoute, AuthorizationStatus, CityName, SortName} from '../../const';


export const authIsUnknown = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

const MainScreenWrapped = withMap(MainScreen);
const PlaceOfferScreenWrapped = withMap(PlaceOfferScreen);
const FavoritesScreenWrapped = withMap(FavoritesScreen);

function AppScreen(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isDataLoaded = useSelector(getOffersLoadStatus);
  const city = useSelector(getCurrentCity);
  const currentSortName = useSelector(getCurrentSortName);
  const allOffers = useSelector(getAllOffers);
  const sortedOffers = useSelector(getSortedOffersInCity);

  const dispatch = useDispatch();

  const onCityChange = (cityName: CityName) => {
    dispatch(changeCityAction(cityName));
  };

  const onSortChange = (sortName: SortName) => {
    dispatch(changeSortNameAction(sortName));
  };

  if (authIsUnknown(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <MainScreenWrapped
          city={city as City}
          offers={sortedOffers}
        >
          <CityScreen
            currentCity={city as City}
            onCityChange={onCityChange}
          />
          <SortingScreen
            currentSortName={currentSortName}
            onSortChange={onSortChange}
          />
          <HeaderUserScreen/>
        </MainScreenWrapped>
      </Route>
      <PrivateRouteScreen
        exact
        path={AppRoute.Favorites}
      >
        <FavoritesScreenWrapped/>
      </PrivateRouteScreen>
      <Route
        exact
        path={AppRoute.SignIn}
      >
        <LoginScreen/>
      </Route>
      {allOffers.map((offer) => (
        <Route key={offer.id} exact path={`${AppRoute.OfferPostfix}${offer.id}`}>
          <PlaceOfferScreenWrapped
            loadOfferId={offer.id}
          >
            <HeaderUserScreen/>
          </PlaceOfferScreenWrapped>
        </Route>
      ))}
      <Route
        path={AppRoute.OfferPostfix}
      >
        <NotPlacesScreen/>
      </Route>
      <Route>
        <NotFoundScreen/>
      </Route>
    </Switch>
  );
}

export default AppScreen;
