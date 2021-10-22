import {Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {ActionsType} from '../../types/action';
import {ChangeCityAction} from '../../store/action';
import {State} from '../../types/state';
import Logo from '../logo/logo';
import SortingScreen from '../sorting/sorting';
import {Offer, City} from '../../types/offer';
import CityScreen from '../city/city';
import {nanoid} from 'nanoid';

type MainScreenProps = {
  cities: City[];
  isMainScreen: boolean;
  renderCard: (offer: Offer, isMainScreen: boolean) => JSX.Element;
  renderMap: (
    currentOffer: Offer | undefined,
    isMainScreen: boolean,
    offers: Offer[],
    center: City,
  ) => JSX.Element;
}

// актуальные состояния данных из хранилища в одноименные пропсы компонента
const mapStateToProps = (state: State) => ({
  // новый пропс в компоненте
  offers: state.offersList,
  city: state.city,
});

// Эта функция добавит нашему компоненту пропс onCityChoose;
const mapDispatchToProps = (dispatch: Dispatch<ActionsType>) => ({
  // должны передать потомку этот колбэк
  onCityChoose(cityName: string) {
    // ChangeCityAction - это Action из store/action;
    // Сообщаем хранилищу, что пора обновить поля, выполнив action
    dispatch(ChangeCityAction(cityName));
  },
});

// Настраиваем "мостик" между Redux и React;
// 1-ый аргумент -- перенос данных полей хранилища в пропсы компонента;
const connector = connect(mapStateToProps, mapDispatchToProps);
// Выделим новые пропсы, сформированные в redux;
type PropsFromRedux = ConnectedProps<typeof connector>;
// Соединим все пропсы, необходимые для кмопонента;
type ConnectedComponentProps = PropsFromRedux & MainScreenProps;

function Main(props: ConnectedComponentProps): JSX.Element {
  const {
    city,
    offers,
    cities,
    isMainScreen,
    renderMap,
    renderCard,
    onCityChoose,
  } = props;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="/">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="/">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cities.map((town) => (
                <CityScreen
                  key={nanoid(10)}
                  cityTitle={town.title}
                  onCityChoose={onCityChoose}
                />
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} {offers.length === 1 ? 'place' : 'places'} to stay in {city.title}</b>
              <SortingScreen
                currentSortName={'Popular'}
              />
              <div className="cities__places-list places__list tabs__content">
                {offers.map((offer) => (
                  renderCard(offer, isMainScreen)
                ))}
              </div>
            </section>
            <div className="cities__right-section">
              {renderMap(undefined, isMainScreen, offers, city)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export {Main};
// Если не обернуть в коннект, то будет требовать от родителя передать пропсы,
// которые мы сформировали через редакс
export default connector(Main);
