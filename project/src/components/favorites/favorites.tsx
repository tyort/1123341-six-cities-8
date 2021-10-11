import {Offer} from '../../types/offer';

type FavoritesScreenProps = {
  offers: Offer[];
}

function FavoritesScreen(props: FavoritesScreenProps): JSX.Element {
  const {offers} = props;
  const cities = [...new Set(offers.map((offer) => offer.city))];

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {cities.map((place, index) => {
              const keyValue = `${index}-${place}`;
              return (
                <li key={keyValue} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="/">
                        <span>{place}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {offers
                      .filter((offer) => (offer.city === place))
                      .map((offer) => {
                        const {price, rating, title, type, images} = offer;
                        const [firstImage] = images;
                        return (
                          <article key={offer.id} className="favorites__card place-card">
                            <div className="favorites__image-wrapper place-card__image-wrapper">
                              <a href="/">
                                <img className="place-card__image" src={`img/${firstImage}`} width="150" height="110" alt="Place view"/>
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
                                  <span style={{width: `${rating}%`}}></span>
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
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default FavoritesScreen;
