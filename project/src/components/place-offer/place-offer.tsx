import PlaceNearbyScreen from '../place-nearby/place-nearby';
import PlaceReviewsScreen from '../place-reviews/place-reviews';
import Map from '../map-two/map-two';
import {Offer} from '../../types/offer';

type OfferScreenProps = {
  currentOffer: Offer;
  offers: Offer[];
}

function PlaceOfferScreen(props: OfferScreenProps): JSX.Element {
  const {currentOffer, offers} = props;
  const {owner, title, images, category, rating, features, price, bonuses} = currentOffer;

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {images.map((image, index) => {
              const keyValue = `${index}-${image}`;
              return (
                <div key={keyValue} className="property__image-wrapper">
                  <img className="property__image" src={`img/${image}`} alt="View studio"/>
                </div>
              );
            })}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            <div className="property__mark">
              <span>{category}</span>
            </div>
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {title}
              </h1>
              <button className="property__bookmark-button button" type="button">
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: '80%'}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{rating}</span>
            </div>
            <ul className="property__features">
              {features.map((feature, index) => {
                const keyValue = `${index}-${feature.addition}`;
                return (
                  <li key={keyValue} className={`property__feature property__feature--${feature.addition}`}>
                    {feature.title}
                  </li>
                );
              })}
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {bonuses.map((bonus, index) => {
                  const keyValue = `${index}-${bonus}`;
                  return (
                    <li key={keyValue} className="property__inside-item">
                      {bonus}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={`img/${owner.avatar}`} width="74" height="74" alt="Host avatar"/>
                </div>
                <span className="property__user-name">
                  {owner.name}
                </span>
                <span className="property__user-status">
                  {owner.status}
                </span>
              </div>
              <div className="property__description">
                <p className="property__text">
                  {owner.text}
                </p>
                <p className="property__text">
                  {owner.text}
                </p>
              </div>
            </div>
            <PlaceReviewsScreen
              offer={currentOffer}
              onCommentLoad={(proposal, comment) => {
                // eslint-disable-next-line no-console
                console.log(proposal);
                // eslint-disable-next-line no-console
                console.log(comment);
              }}
            />
          </div>
        </div>
        <Map
          offers={offers}
          currentOffer={currentOffer}
        />
      </section>
      <PlaceNearbyScreen
        offers={offers}
        currentOffer={currentOffer}
      />
    </main>
  );
}

export default PlaceOfferScreen;
