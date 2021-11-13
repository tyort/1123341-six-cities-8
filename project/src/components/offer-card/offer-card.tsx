/* eslint-disable camelcase */
import {MouseEvent, memo, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Offer} from '../../types/offer';
import {Link, useHistory} from 'react-router-dom';
import {changeFavoriteAction} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/auth-reducer/selectors';
import {nanoid} from 'nanoid';
import {AuthorizationStatus, AppRoute} from '../../const';

type CardScreenProps = {
  offers: Offer[];
  onCardMainHover: (hoveredOffer: Offer | undefined) => void;
  isMainScreen: boolean;
}

function OfferCard(props: CardScreenProps): JSX.Element {
  // eslint-disable-next-line no-console
  console.log('OfferCard');
  const {offers, onCardMainHover, isMainScreen} = props;
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const history = useHistory();

  const dispatch = useDispatch();

  return (
    <Fragment>
      {offers.map((offer) => {
        const {price, rating, title, type, preview_image, is_favorite, is_premium} = offer;
        const percentRating = rating * 20;


        const hoverHandler = (evt: MouseEvent<HTMLElement>) => {
          evt.preventDefault();
          evt.type === 'mouseenter'
            ? onCardMainHover(offer)
            : onCardMainHover(undefined);
        };

        const buttonClickHandler = (evt: MouseEvent<HTMLElement>) => {
          evt.preventDefault();
          if (authorizationStatus !== AuthorizationStatus.Auth) {
            history.push(AppRoute.SignIn);
            return;
          }
          evt.currentTarget.classList.toggle('place-card__bookmark-button--active');
          evt.currentTarget.classList.contains('place-card__bookmark-button--active')
            ? dispatch(changeFavoriteAction({...offer, is_favorite: true}))
            : dispatch(changeFavoriteAction({...offer, is_favorite: false}));
        };

        return (
          <article
            data-testid="offer-article"
            key={nanoid(10)}
            className={`${isMainScreen ? 'cities__place-card' : 'near-places__card'} place-card`}
            onMouseEnter={hoverHandler}
            onMouseLeave={hoverHandler}
          >
            {is_premium
            &&
            <div className="place-card__mark">
              <span>Premium</span>
            </div>}
            <div className={`${isMainScreen
              ? 'cities__image-wrapper'
              : 'near-places__image-wrapper'} place-card__image-wrapper`}
            >
              <a href="/">
                <img className="place-card__image" src={`${preview_image}`} width="260" height="200" alt="Interior view"/>
              </a>
            </div>
            <div className="place-card__info">
              <div className="place-card__price-wrapper">
                <div className="place-card__price">
                  <b className="place-card__price-value">&euro;{price}</b>
                  <span className="place-card__price-text">&#47;&nbsp;night</span>
                </div>
                <button
                  className={`${is_favorite && 'place-card__bookmark-button--active'} place-card__bookmark-button button`}
                  type="button"
                  onClick={buttonClickHandler}
                >
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
                <Link
                  data-testid="offer-link"
                  to={`/offer/${offer.id}`}
                >{title}
                </Link>
              </h2>
              <p className="place-card__type">{type}</p>
            </div>
          </article>
        );
      })}
    </Fragment>
  );
}

export default memo(OfferCard, (prevProps, nextProps) =>
  prevProps.offers === nextProps.offers,
);


