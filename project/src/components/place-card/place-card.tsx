import {useState, MouseEvent} from 'react';
import {Offer} from '../../types/offer';
import {useHistory, Link} from 'react-router-dom';
import {AppRoute} from '../../const';

type CardScreenProps = {
  offer: Offer;
}

function PlaceCard(props: CardScreenProps): JSX.Element {
  const {offer} = props;
  const {price, rating, title, type} = offer;
  const [, setActualHover] = useState('Fly away');
  const history = useHistory();

  return (
    <article
      className="cities__place-card place-card"
      onMouseEnter={(evt: MouseEvent<HTMLElement>) => {
        setActualHover('Hover');
      }}
      onMouseLeave={(evt: MouseEvent<HTMLElement>) => {
        setActualHover('Fly away');
      }}
    >
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="/">
          <img className="place-card__image" src="img/room.jpg" width="260" height="200" alt="Interior view"/>
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
            to="/offer/:id"
            onClick={() => history.push(AppRoute.Room)}
          >{title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;


