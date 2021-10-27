import {Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
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
import {ActionsType, ChangeCityPayload, ChangeSortPayload} from '../../types/action';
import {changeCityAction, changeSortNameAction} from '../../store/action';
import withMap from '../../hocs/with-map/with-map';
import {nanoid} from 'nanoid';

export const authIsUnknown = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

// актуальные состояния данных из хранилища в одноименные пропсы компонента
const mapStateToProps = (state: State) => ({
  // новый пропс в компоненте
  offers: state.offersList,
  city: state.city,
  currentSortName: state.sortName,
  cities: state.cities,
  isDataLoaded: state.isDataLoaded,
  authorizationStatus: state.authorizationStatus,
});

// Эта функция добавит нашему компоненту пропс onCityChoose;
const mapDispatchToProps = (dispatch: Dispatch<ActionsType>) => ({
  // должны передать потомку этот колбэк
  onCityChoose(cityName: ChangeCityPayload) {
    // changeCityAction - это Action из store/action;
    // Сообщаем хранилищу, что пора обновить поля, выполнив action
    dispatch(changeCityAction(cityName));
  },

  onSortChoose(sortName: ChangeSortPayload) {
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
  const {city, offers, cities, onCityChoose, currentSortName, onSortChoose, isDataLoaded, authorizationStatus} = props;

  if (authIsUnknown(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainScreenWrapped
            offers={offers}
            city={city}
            isMainScreen
          >
            <CityScreen
              currentCity={city}
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
          render={() => <FavoritesScreen offers={offers}/>}
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

export {App};
// Если не обернуть в коннект, то будет требовать от родителя передать пропсы,
// которые мы сформировали через редакс
export default connector(App);
