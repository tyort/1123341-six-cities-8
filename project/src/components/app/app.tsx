import {Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, CityName, SortName} from '../../const';
import MainScreen from '../main/main';
import FavoritesScreen from '../favorites/favorites';
import LoginScreen from '../login/login';
import PlaceOfferScreen from '../place-offer/place-offer';
import NotFoundScreen from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import CityScreen from '../city/city';
import SortingScreen from '../sorting/sorting';
import LoadingScreen from '../loading-screen/loading-screen';
import {State} from '../../types/state';
import {ActionsType} from '../../types/action';
import {changeCityAction, changeSortNameAction} from '../../store/action';
import withMap from '../../hocs/with-map/with-map';
import {nanoid} from 'nanoid';
import browserHistory from '../../browser-history';
import {City} from '../../types/city';
import {getAuthorizationStatus} from '../../store/auth-reducer/selectors';
import {getAllOffers, getSortedOffersInCity, getCurrentCity, getCurrentSortName,
  getAllCities, getOffersLoadStatus} from '../../store/offers-reducer/selectors';

export const authIsUnknown = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

const mapStateToProps = (state: State) => ({
  offers: getSortedOffersInCity(state),
  allOffers: getAllOffers(state),
  city: getCurrentCity(state),
  currentSortName: getCurrentSortName(state),
  cities: getAllCities(state),
  isDataLoaded: getOffersLoadStatus(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch: Dispatch<ActionsType>) => ({
  onCityChoose(cityName: CityName) {
    // changeCityAction - это Action из store/action;
    // Сообщаем хранилищу, что пора обновить поля, выполнив action
    dispatch(changeCityAction(cityName));
  },

  onSortChoose(sortName: SortName) {
    dispatch(changeSortNameAction(sortName));
  },
});

// Настраиваем "мостик" между Redux и React;
// 1-ый аргумент -- перенос данных полей хранилища в пропсы компонента;
const connector = connect(mapStateToProps, mapDispatchToProps);

// Выделим новые пропсы, сформированные в redux;
type PropsFromRedux = ConnectedProps<typeof connector>;

const MainScreenWrapped = withMap(MainScreen);
const PlaceOfferScreenWrapped = withMap(PlaceOfferScreen);

function App(props: PropsFromRedux): JSX.Element {
  const {allOffers, city, offers, cities, onCityChoose, currentSortName, onSortChoose, isDataLoaded, authorizationStatus} = props;

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

export {App};
export default connector(App);
