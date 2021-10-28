import {Link} from 'react-router-dom';
import {PropsWithChildren, Children} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import Logo from '../logo/logo';
import {Offer} from '../../types/offer';
import {City} from '../../types/city';
import {ThunkAppDispatch} from '../../types/action';
import {logoutAction} from '../../store/api-actions';

type MainScreenProps = PropsWithChildren<{
  offers: Offer[];
  city: City;
  isMainScreen: boolean;
  renderCard: (offer: Offer, isMainScreen: boolean) => JSX.Element;
  renderMap: (
    currentOffer: Offer | undefined,
    isMainScreen: boolean,
    offers: Offer[],
    center: City,
  ) => JSX.Element;
}>


const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  logoutApp() {
    dispatch(logoutAction());
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MainScreenProps;

function MainScreen(props: ConnectedComponentProps): JSX.Element {
  const {
    city,
    offers,
    isMainScreen,
    renderMap,
    renderCard,
    children,
    logoutApp,
  } = props;

  // У данного компонента несколько дочерних компонентов, если хочу ими манипулировать:
  const mainChildren = Children.toArray(children);

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
                  <Link
                    className="header__nav-link"
                    to="/"
                    onClick={(evt) => {
                      evt.preventDefault();
                      logoutApp();
                    }}
                  >
                    <span className="header__signout">Sign out</span>
                  </Link>
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
            {mainChildren[0]}
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} {offers.length === 1 ? 'place' : 'places'} to stay in {city.name}</b>
              {mainChildren[1]}
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

export {MainScreen};
export default connector(MainScreen);
