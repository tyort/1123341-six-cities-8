/* eslint-disable camelcase */
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFavoritesAction} from '../../store/api-actions';
import {getAllOffers} from '../../store/offers-reducer/selectors';
import {nanoid} from 'nanoid';

function FavoritesScreen(): JSX.Element {
  const offers = useSelector(getAllOffers);
  const favoriteOffers = offers.filter((offer) => offer.is_favorite === true);
  const cities = [...new Set(favoriteOffers.map((offer) => offer.city.name))];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
                  {favoriteOffers
                    .filter((offer) => (offer.city.name === place))
                    .map((offer) => {
                      const {price, rating, title, type, preview_image} = offer;
                      const percentRating = rating * 20;

                      return (
                        <article key={offer.id} className="favorites__card place-card">
                          <div className="favorites__image-wrapper place-card__image-wrapper">
                            <a href="/">
                              <img className="place-card__image" src={`${preview_image}`} width="150" height="110" alt="Place view"/>
                            </a>
                          </div>
                          <div className="favorites__card-info place-card__info">
                            <div className="place-card__price-wrapper">
                              <div className="place-card__price">
                                <b className="place-card__price-value">&euro;{price}</b>
                                <span className="place-card__price-text">&#47;&nbsp;night</span>
                              </div>
                              <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                                <svg className="place-card__bookmark-icon" width="18" height="19">
                                  <use xlinkHref="#icon-bookmark"></use>
                                </svg>
                                <span className="visually-hidden">In bookmarks</span>
                              </button>
                            </div>
                            <div className="place-card__rating rating">
                              <div className="place-card__stars rating__stars">
                                <span style={{width: `${percentRating}%`}}></span>
                                <span className="visually-hidden">Rating</span>
                              </div>
                            </div>
                            <h2 className="place-card__name">
                              <a href="/">{title}</a>
                            </h2>
                            <p className="place-card__type">{type}</p>
                          </div>
                        </article>
                      );
                    })}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default FavoritesScreen;
