/* eslint-disable camelcase */
import {useEffect, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import PlaceNearbyScreen from '../place-nearby/place-nearby';
import PlaceReviewsScreen from '../place-reviews/place-reviews';
import {Offer} from '../../types/offer';
import {Comment} from '../../types/comment';
import {City} from '../../types/city';
import {nanoid} from 'nanoid';
import {State} from '../../types/state';
import {ThunkAppDispatch} from '../../types/action';
import {fetchCommentsAction, fetchNearbyAction} from '../../store/api-actions';


type OfferScreenProps = {
  currentOffer: Offer;
  isMainScreen: boolean;
  renderCard: (offer: Offer, isMainScreen: boolean) => JSX.Element;
  renderMap: (
    currentOffer: Offer,
    isMainScreen: boolean,
    offers: Offer[],
    center: City,
  ) => JSX.Element;
}

const mapStateToProps = (state: State) => ({
  nearbyOffers: state.nearbyOffers,
  comments: state.comments,
  authorizationStatus: state.authorizationStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onCommentsLoad(offerId: number) {
    dispatch(fetchCommentsAction(offerId));
  },

  onNearbyLoad(offerId: number) {
    dispatch(fetchNearbyAction(offerId));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & OfferScreenProps;

function PlaceOfferScreen(props: ConnectedComponentProps): JSX.Element {
  const {authorizationStatus, currentOffer, isMainScreen, renderMap, renderCard,
    nearbyOffers, comments, onCommentsLoad, onNearbyLoad} = props;

  const {bedrooms, type, host, title, images, category,
    rating, price, goods, description, max_adults} = currentOffer;

  const [offerComments, setComments] = useState<Comment[]>(comments);
  const [offerNearby, setNearby] = useState<Offer[]>(nearbyOffers);

  useEffect(() => {
    onCommentsLoad(currentOffer.id as number);
    onNearbyLoad(currentOffer.id as number);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    setComments(comments);
    setNearby(nearbyOffers);
  }, [comments, nearbyOffers]);

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {images.map((image) => (
              <div key={nanoid(10)} className="property__image-wrapper">
                <img className="property__image" src={`${image}`} alt="View studio"/>
              </div>
            ))}
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
              <li className="property__feature property__feature--entire">
                {type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {max_adults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {goods.map((bonus) => (
                  <li key={nanoid(10)} className="property__inside-item">
                    {bonus}
                  </li>
                ))}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={`${host.avatar_url}`} width="74" height="74" alt="Host avatar"/>
                </div>
                <span className="property__user-name">
                  {host.name}
                </span>
                <span className="property__user-status">
                  {host.is_pro && 'Pro'}
                </span>
              </div>
              <div className="property__description">
                <p className="property__text">
                  {description}
                </p>
              </div>
            </div>
            <PlaceReviewsScreen
              authorizationStatus={authorizationStatus}
              comments={offerComments}
            />
          </div>
        </div>
        {renderMap(currentOffer, isMainScreen, [...offerNearby, currentOffer], currentOffer.city)}
      </section>
      <PlaceNearbyScreen
        offers={offerNearby}
        isMainScreen={isMainScreen}
        renderCard={renderCard}
      />
    </main>
  );
}

export {PlaceOfferScreen};
export default connector(PlaceOfferScreen);
