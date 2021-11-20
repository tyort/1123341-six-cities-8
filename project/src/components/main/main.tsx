import {PropsWithChildren, Children} from 'react';
import Logo from '../logo/logo';
import {Offer} from '../../types/offer';
import {City} from '../../types/city';
import {ScreenType} from '../../const';


type MainScreenProps = PropsWithChildren<{
  offers: Offer[];
  city: City;
  renderCard: (offers: Offer[], screenType: ScreenType) => JSX.Element;
  renderMap: (
    currentOffer: Offer | undefined,
    screenType: ScreenType,
    offers: Offer[],
    center: City,
  ) => JSX.Element;
}>

function MainScreen(props: MainScreenProps): JSX.Element {
  const {offers, city, renderMap, renderCard, children} = props;

  // У данного компонента несколько дочерних компонентов, если хочу ими манипулировать:
  const mainChildren = Children.toArray(children);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            {mainChildren[2]}
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
                  {renderCard(offers, ScreenType.Main)}
                </div>
              </section>
              <div className="cities__right-section">
                {renderMap(undefined, ScreenType.Main, offers, city)}
              </div>
            </div>}

        </div>
      </main>
    </div>
  );
}

export default MainScreen;
