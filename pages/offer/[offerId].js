import { Fragment, useState } from 'react';
import Image from 'next/image';
import PlacesList from '../../components/PlacesList';
import OfferRepository from '../../src/repositories/OfferRepository';
import ReviewsListScreen from '../../components/ReviewsList';

const offerRepository = new OfferRepository();

export async function getStaticPaths() {
  let offers = await offerRepository.getAllOffers();
  offers = JSON.parse(offers);
  const paths = offers.map((offer) => ({
    params: { offerId: offer.id.toString() },
  }));

  return {
    paths,
    fallback: false, // отображаем страницу 404, если offerId не существует;
  };
}

export async function getStaticProps(context) {
  let offers = await offerRepository.getAllOffers();
  offers = JSON.parse(offers);

  const { offerId } = context.params;
  let offer = await offerRepository.getOffer({ offerId: Number(offerId) });
  offer = JSON.parse(offer);
  return {
    props: { offer, offers },
  };
}

function OfferScreen({ offer, offers }) {
  const [rate, setRating] = useState(0);
  const [userComment, setUserComment] = useState('');

  const {
    images,
    rating,
    is_premium,
    title,
    type,
    bedrooms,
    max_adults,
    description,
    price,
    goods,
  } = offer;

  const handleInputChange = (evt) => {
    setRating(Number(evt.target.value));
  };

  const handleTextareaChange = (evt) => {
    const { value } = evt.target;
    setUserComment(value);
  };

  return (
    <main className='page__main page__main--property'>
      <section className='property'>
        <div className='property__gallery-container container'>
          <div className='property__gallery'>
            {images.map((image) => (
              <div key={image} className='property__image-wrapper'>
                <Image
                  className='property__image'
                  src={`/${image}`}
                  layout='fill'
                  alt='Photo studio'
                />
              </div>
            ))}
          </div>
        </div>
        <div className='property__container container'>
          <div className='property__wrapper'>
            {is_premium && (
              <div className='property__mark'>
                <span>Premium</span>
              </div>
            )}

            <div className='property__name-wrapper'>
              <h1 className='property__name'>{title}</h1>
              <button
                className='property__bookmark-button button'
                type='button'
              >
                <svg className='property__bookmark-icon' width='31' height='33'>
                  <use xlinkHref='#icon-bookmark' />
                </svg>
                <span className='visually-hidden'>To bookmarks</span>
              </button>
            </div>
            <div className='property__rating rating'>
              <div className='property__stars rating__stars'>
                <span style={{ width: `${(rating * 100) / 5}%` }} />
                <span className='visually-hidden'>Rating</span>
              </div>
              <span className='property__rating-value rating__value'>
                {rating}
              </span>
            </div>
            <ul className='property__features'>
              <li className='property__feature property__feature--entire'>
                {type}
              </li>
              <li className='property__feature property__feature--bedrooms'>
                {bedrooms} Bedrooms
              </li>
              <li className='property__feature property__feature--adults'>
                Max {max_adults} adults
              </li>
            </ul>
            <div className='property__price'>
              <b className='property__price-value'>&euro;{price}</b>
              <span className='property__price-text'>&nbsp;night</span>
            </div>
            <div className='property__inside'>
              <h2 className='property__inside-title'>What&apos;s inside</h2>
              <ul className='property__inside-list'>
                {goods.map((item) => (
                  <li key={item} className='property__inside-item'>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className='property__host'>
              <h2 className='property__host-title'>Meet the host</h2>
              <div className='property__host-user user'>
                <div className='property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper'>
                  <Image
                    className='property__avatar user__avatar'
                    src='/img/avatar-angelina.jpg'
                    width='74'
                    height='74'
                    alt='Host avatar'
                  />
                </div>
                <span className='property__user-name'>Angelina</span>
                <span className='property__user-status'>Pro</span>
              </div>
              <div className='property__description'>
                <p className='property__text'>{description}</p>
              </div>
            </div>
            <section className='property__reviews reviews'>
              <h2 className='reviews__title'>
                Reviews &middot; <span className='reviews__amount'>1</span>
              </h2>
              <ReviewsListScreen />
              <form className='reviews__form form' action='#' method='post'>
                <label className='reviews__label form__label' htmlFor='review'>
                  Your review
                </label>
                <div className='reviews__rating-form form__rating'>
                  {new Array(5).fill('').map((_item, index, array) => {
                    const points = array.length - index;
                    return (
                      <Fragment key={points}>
                        <input
                          className='form__rating-input visually-hidden'
                          name='rating'
                          value={points}
                          id={`${points}-stars`}
                          type='radio'
                          checked={rate === points}
                          onChange={handleInputChange}
                        />
                        <label
                          htmlFor={`${points}-stars`}
                          className='reviews__rating-label form__rating-label'
                          title='perfect'
                        >
                          <svg
                            className='form__star-image'
                            width='37'
                            height='33'
                          >
                            <use xlinkHref='#icon-star' />
                          </svg>
                        </label>
                      </Fragment>
                    );
                  })}
                </div>
                <textarea
                  value={userComment}
                  onChange={handleTextareaChange}
                  className='reviews__textarea form__textarea'
                  id='review'
                  name='review'
                  placeholder='Tell how was your stay, what you like and what can be improved'
                />
                <div className='reviews__button-wrapper'>
                  <p className='reviews__help'>
                    To submit review please make sure to set{' '}
                    <span className='reviews__star'>rating</span> and describe
                    your stay with at least{' '}
                    <b className='reviews__text-amount'>50 characters</b>.
                  </p>
                  <button
                    className='reviews__submit form__submit button'
                    type='submit'
                    disabled=''
                  >
                    Submit
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
        <section className='property__map map' />
      </section>
      <div className='container'>
        <section className='near-places places'>
          <h2 className='near-places__title'>
            Other places in the neighbourhood
          </h2>
          <PlacesList offers={offers} screen='OfferScreen' />
        </section>
      </div>
    </main>
  );
}

export default OfferScreen;
