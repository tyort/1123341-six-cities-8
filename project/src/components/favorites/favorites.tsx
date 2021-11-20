/* eslint-disable camelcase */
import {useEffect, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFavoritesAction} from '../../store/api-actions';
import {getAllOffers} from '../../store/offers-reducer/selectors';
import HeaderUserScreen from '../header-user/header-user';
import LogoScreen from '../logo/logo';
import FavoritesEmptyScreen from '../favorites-empty/favorites-empty';
import {nanoid} from 'nanoid';
import {ScreenType } from '../../const';
import { Offer } from '../../types/offer';

type FavoritesScreenProps = {
  renderCard: (offers: Offer[], screenType: ScreenType) => JSX.Element;
};

function FavoritesScreen(props: FavoritesScreenProps): JSX.Element {
  const {renderCard} = props;
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
            <LogoScreen/>
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
                    {renderCard(favoriteOffers.filter((offer) => (offer.city.name === place)), ScreenType.Favorites)}
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
