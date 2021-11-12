import {Link} from 'react-router-dom';
import {PropsWithChildren, Children, MouseEvent} from 'react';
import Logo from '../logo/logo';
import {Offer} from '../../types/offer';
import {City} from '../../types/city';
import {AuthorizationStatus, AppRoute} from '../../const';

type MainScreenProps = PropsWithChildren<{
  authorizationStatus: AuthorizationStatus;
  offers: Offer[];
  onLogoutHandler: (evt: MouseEvent<HTMLElement>) => void
  city: City;
  isMainScreen: boolean;
  renderCard: (offers: Offer[], isMainScreen: boolean) => JSX.Element;
  renderMap: (
    currentOffer: Offer | undefined,
    isMainScreen: boolean,
    offers: Offer[],
    center: City,
  ) => JSX.Element;
}>

function MainScreen(props: MainScreenProps): JSX.Element {
  // eslint-disable-next-line no-console
  console.log('MainScreen');
  const {authorizationStatus, onLogoutHandler, offers, city, isMainScreen, renderMap, renderCard, children} = props;

  // У данного компонента несколько дочерних компонентов, если хочу ими манипулировать:
  const mainChildren = Children.toArray(children);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              {authorizationStatus === AuthorizationStatus.Auth
                ?
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
                      onClick={onLogoutHandler}
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </ul>
                :
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.SignIn}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                </ul>}
            </nav>
          </div>
        </div>
      </header>

      <main className={`page__main page__main--index ${offers.length === 0 && 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            {mainChildren[0]}
          </section>
        </div>
        <div className="cities">

          {offers.length === 0
            ?
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
            :
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} {offers.length === 1 ? 'place' : 'places'} to stay in {city.name}</b>
                {mainChildren[1]}
                <div className="cities__places-list places__list tabs__content">
                  {renderCard(offers, isMainScreen)}
                </div>
              </section>
              <div className="cities__right-section">
                {renderMap(undefined, isMainScreen, offers, city)}
              </div>
            </div>}

        </div>
      </main>
    </div>
  );
}

export default MainScreen;
