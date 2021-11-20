/* eslint-disable camelcase */
import {useEffect, PropsWithChildren, Fragment, MouseEvent} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PlaceNearbyScreen from '../place-nearby/place-nearby';
import PlaceReviewsScreen from '../place-reviews/place-reviews';
import {Offer} from '../../types/offer';
import {City} from '../../types/city';
import {nanoid} from 'nanoid';
import {changeFavoriteAction, fetchCommentsAction, fetchNearbyAction} from '../../store/api-actions';
import {getOfferNearbies} from '../../store/single-offer-reducer/selectors';
import {AppRoute, AuthorizationStatus, ScreenType} from '../../const';
import { useHistory } from 'react-router-dom';
import { getAuthorizationStatus } from '../../store/auth-reducer/selectors';

type OfferScreenProps = PropsWithChildren<{
  currentOffer: Offer;
  renderCard: (offers: Offer[], screenType: ScreenType) => JSX.Element;
  renderMap: (
    currentOffer: Offer,
    screenType: ScreenType,
    offers: Offer[],
    center: City,
  ) => JSX.Element;
}>

function PlaceOfferScreen(props: OfferScreenProps): JSX.Element {
  const {currentOffer, renderMap, renderCard, children} = props;
  const {bedrooms, type, host, title, images, category,
    rating, price, goods, description, max_adults, is_favorite} = currentOffer;
  const percentRating = rating * 20;
  const history = useHistory();
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const nearbyOffers = useSelector(getOfferNearbies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommentsAction(currentOffer.id as number));
    dispatch(fetchNearbyAction(currentOffer.id as number));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buttonClickHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      history.push(AppRoute.SignIn);
      return;
    }
    evt.currentTarget.classList.toggle('property__bookmark-button--active');
    dispatch(changeFavoriteAction({...currentOffer, is_favorite: !currentOffer.is_favorite}));
  };

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
            {children}
          </div>
        </div>
      </header>
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
                <button
                  className={`${is_favorite && 'property__bookmark-button--active'} property__bookmark-button button`}
                  type="button"
                  onClick={buttonClickHandler}
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${percentRating}%`}}></span>
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
                currentOffer={currentOffer}
              />
            </div>
          </div>
          {renderMap(currentOffer, ScreenType.Offer, [...nearbyOffers, currentOffer], currentOffer.city)}
        </section>
        <PlaceNearbyScreen
          offers={nearbyOffers}
          renderCard={renderCard}
        />
      </main>
    </Fragment>
  );
}

export default PlaceOfferScreen;
