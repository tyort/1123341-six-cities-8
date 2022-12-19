import Image from 'next/image';
import Link from 'next/link';

function PlaceCard({ offer, screen }) {
  const {
    preview_image,
    price,
    rating,
    title,
    type,
    is_premium,
    offerLocation,
  } = offer;

  let articleClasses;
  let imgClasses;
  let infoClasses;

  switch (screen) {
    case 'MainScreen':
      articleClasses = 'cities__place-card';
      imgClasses = 'cities__image-wrapper';
      infoClasses = '';
      break;
    case 'OfferScreen':
      articleClasses = 'near-places__card';
      imgClasses = 'near-places__image-wrapper';
      infoClasses = '';
      break;
    default:
      articleClasses = 'favorites__card';
      imgClasses = 'favorites__image-wrapper';
      infoClasses = 'favorites__card-info';
  }

  const isShowPremium = is_premium && screen === 'MainScreen';

  return (
    <article
      data-offer-id={offer.id}
      className={`${articleClasses} place-card`}
    >
      {isShowPremium && (
        <div className='place-card__mark'>
          <span>Premium</span>
        </div>
      )}
      <div className={`${imgClasses} place-card__image-wrapper`}>
        <Link href={`/offer/${offer.id}`}>
          <Image
            className='place-card__image mark-for-getting-coordinates'
            src={`/${preview_image}`}
            width={screen !== 'FavoritesScreen' ? 260 : 150}
            height={screen !== 'FavoritesScreen' ? 200 : 110}
            alt='Place image'
            data-latitude={offerLocation.latitude}
            data-longitude={offerLocation.longitude}
          />
        </Link>
      </div>

      <div className={`${infoClasses} place-card__info`}>
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
          <Link
            href={`/offer/${offer.id}`}
            data-latitude={offerLocation.latitude}
            data-longitude={offerLocation.longitude}
            className='mark-for-getting-coordinates'
          >
            {title}
          </Link>
        </h2>
        <p className='place-card__type'>{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
