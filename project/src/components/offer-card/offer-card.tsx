/* eslint-disable camelcase */
import {MouseEvent} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Offer} from '../../types/offer';
import {Link} from 'react-router-dom';
import {ThunkAppDispatch} from '../../types/action';
import {fetchCommentsAction, fetchNearbyAction} from '../../store/api-actions';

type CardScreenProps = {
  offer: Offer;
  onCardMainHover: (card: Offer | undefined) => void;
  isMainScreen: boolean;
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onCommentsLoad(offerId: number) {
    dispatch(fetchCommentsAction(offerId));
  },

  onNearbyLoad(offerId: number) {
    dispatch(fetchNearbyAction(offerId));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & CardScreenProps;

function OfferCard(props: ConnectedComponentProps): JSX.Element {
  const {offer, onCardMainHover, isMainScreen, onCommentsLoad, onNearbyLoad} = props;
  const {price, rating, title, type, preview_image} = offer;

  return (
    <article
      className={`${isMainScreen ? 'cities__place-card' : 'near-places__card'} place-card`}
      onMouseEnter={(evt: MouseEvent<HTMLElement>) => {
        evt.preventDefault();
        onCardMainHover(offer);
      }}
      onMouseLeave={(evt: MouseEvent<HTMLElement>) => {
        evt.preventDefault();
        onCardMainHover(undefined);
      }}
    >
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
          <Link
            to={`/hotels/${offer.id}`}
            onClick={() => {
              onCommentsLoad(offer.id as number);
              onNearbyLoad(offer.id as number);
            }}
          >{title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export {OfferCard};
export default connector(OfferCard);


