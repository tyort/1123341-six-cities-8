import Image from 'next/image';
import Link from 'next/link';

function PlaceCard({ offer }) {
  const { preview_image, price, rating, title, type, is_premium } = offer;
  return (
    <article className='cities__place-card place-card'>
      {is_premium && (
        <div className='place-card__mark'>
          <span>Premium</span>
        </div>
      )}
      <div className='cities__image-wrapper place-card__image-wrapper'>
        <Link href='#' passRef>
          <a>
            <Image
              className='place-card__image'
              src={`/${preview_image}`}
              width={260}
              height={200}
              alt='Place image'
            />
          </a>
        </Link>
      </div>
      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button
            className='place-card__bookmark-button place-card__bookmark-button--active button'
            type='button'
          >
            <svg className='place-card__bookmark-icon' width='18' height='19'>
              <use xlinkHref='#icon-bookmark' />
            </svg>
            <span className='visually-hidden'>In bookmarks</span>
          </button>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{ width: `${(rating * 100) / 5}%` }} />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link href='#' passRef>
            <a>{title}</a>
          </Link>
        </h2>
        <p className='place-card__type'>{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
