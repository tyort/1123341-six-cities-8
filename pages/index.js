import Link from 'next/link';
import Header from '../components/Header';
import PlaceCardComponent from '../components/PlaceCard';
import adverts from '../lib/offers';

import OfferRepository from '../src/repositories/OfferRepository';

function MainScreen({ offers }) {
  return (
    <div className='page page--gray page--main'>
      <Header />

      <main className='page__main page__main--index'>
        <h1 className='visually-hidden'>Cities</h1>
        <div className='tabs'>
          <section className='locations container'>
            <ul className='locations__list tabs__list'>
              <li className='locations__item'>
                <Link href='#' passRef>
                  <a className='locations__item-link tabs__item'>
                    <span>Paris</span>
                  </a>
                </Link>
              </li>
              <li className='locations__item'>
                <Link href='#' passRef>
                  <a className='locations__item-link tabs__item'>
                    <span>Cologne</span>
                  </a>
                </Link>
              </li>
              <li className='locations__item'>
                <Link href='#' passRef>
                  <a className='locations__item-link tabs__item'>
                    <span>Brussels</span>
                  </a>
                </Link>
              </li>
              <li className='locations__item'>
                <Link href='#' passRef>
                  <a className='locations__item-link tabs__item tabs__item--active'>
                    <span>Amsterdam</span>
                  </a>
                </Link>
              </li>
              <li className='locations__item'>
                <Link href='#' passRef>
                  <a className='locations__item-link tabs__item'>
                    <span>Hamburg</span>
                  </a>
                </Link>
              </li>
              <li className='locations__item'>
                <Link href='#' passRef>
                  <a className='locations__item-link tabs__item'>
                    <span>Dusseldorf</span>
                  </a>
                </Link>
              </li>
            </ul>
          </section>
        </div>
        <div className='cities'>
          <div className='cities__places-container container'>
            <section className='cities__places places'>
              <h2 className='visually-hidden'>Places</h2>
              <b className='places__found'>312 places to stay in Amsterdam</b>
              <form className='places__sorting' action='#' method='get'>
                <span className='places__sorting-caption'>Sort by</span>
                <span className='places__sorting-type' tabIndex='0'>
                  Popular
                  <svg className='places__sorting-arrow' width='7' height='4'>
                    <use xlinkHref='#icon-arrow-select' />
                  </svg>
                </span>
                <ul className='places__options places__options--custom places__options--opened'>
                  <li
                    className='places__option places__option--active'
                    tabIndex='0'
                  >
                    Popular
                  </li>
                  <li className='places__option' tabIndex='0'>
                    Price: low to high
                  </li>
                  <li className='places__option' tabIndex='0'>
                    Price: high to low
                  </li>
                  <li className='places__option' tabIndex='0'>
                    Top rated first
                  </li>
                </ul>
              </form>
              <div className='cities__places-list places__list tabs__content'>
                {offers !== null &&
                  offers.map((offer) => (
                    <PlaceCardComponent key={offer.id} offer={offer} />
                  ))}
              </div>
            </section>
            <div className='cities__right-section'>
              <section className='cities__map map' />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const offerRepository = new OfferRepository();
  await offerRepository.createOffers(adverts);
  let offers = await offerRepository.getAllOffers();
  offers = JSON.parse(JSON.stringify(offers));

  return {
    props: {
      offers,
    },
  };
}

export default MainScreen;
