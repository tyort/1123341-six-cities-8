import {PropsWithChildren} from 'react';
import Logo from '../logo/logo';
import SortingScreen from '../sorting/sorting';
import {Offer} from '../../types/offer';
import {City} from '../../types/city';
import {ChangeSortPayload} from '../../types/action';


type MainScreenProps = PropsWithChildren<{
  offers: Offer[];
  city: City;
  currentSortName: ChangeSortPayload;
  isMainScreen: boolean;
  onSortChoose: (sortName: ChangeSortPayload) => void
  renderCard: (offer: Offer, isMainScreen: boolean) => JSX.Element;
  renderMap: (
    currentOffer: Offer | undefined,
    isMainScreen: boolean,
    offers: Offer[],
    center: City,
  ) => JSX.Element;
}>

function Main(props: MainScreenProps): JSX.Element {
  const {
    city,
    offers,
    isMainScreen,
    renderMap,
    renderCard,
    currentSortName,
    onSortChoose,
    children,
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
            {children}
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} {offers.length === 1 ? 'place' : 'places'} to stay in {city.title}</b>
              <SortingScreen
                currentSortName={currentSortName}
                onSortChoose={onSortChoose}
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

export default Main;
