/* eslint-disable camelcase */
import {useEffect, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFavoritesAction} from '../../store/api-actions';
import {getAllOffers} from '../../store/offers-reducer/selectors';
import HeaderUserScreen from '../header-user/header-user';
import FavoritesEmptyScreen from '../favorites-empty/favorites-empty';
import OfferCard from '../../components/offer-card/offer-card';
import {nanoid} from 'nanoid';
import {ScreenType } from '../../const';

function FavoritesScreen(): JSX.Element {
  const offers = useSelector(getAllOffers);
  const favoriteOffers = offers.filter((offer) => offer.is_favorite === true);
  const cities = [...new Set(favoriteOffers.map((offer) => offer.city.name))];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (favoriteOffers.length === 0) {
    return (
      <FavoritesEmptyScreen/>
    );
  }

  return (
    <Fragment>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <HeaderUserScreen/>
          </div>
        </div>
      </header>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cities.map((place) => (
                <li key={nanoid(10)} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="/">
                        <span>{place}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <OfferCard
                      offers={favoriteOffers.filter((offer) => (offer.city.name === place))}
                      screenType={ScreenType.Favorites}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </Fragment>
  );
}

export default FavoritesScreen;
