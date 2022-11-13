import { unstable_getServerSession } from 'next-auth/next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../components/Header';
import PlacesList from '../components/PlacesList';
import { authOptions } from './api/auth/[...nextauth]';

import OfferRepository from '../src/repositories/OfferRepository';

function MainScreen({ offers, offersLocation }) {
  return (
    <>
      <div className='page page--gray page--main'>
        <Header />

        <main className='page__main page__main--index'>
          <h1 className='visually-hidden'>Cities</h1>
          <div className='tabs'>
            <section className='locations container'>
              <ul className='locations__list tabs__list'>
                <li className='locations__item'>
                  <Link href='/' className='locations__item-link tabs__item'>
                    <span>Paris</span>
                  </Link>
                </li>
                <li className='locations__item'>
                  <Link href='/' className='locations__item-link tabs__item'>
                    <span>Cologne</span>
                  </Link>
                </li>
                <li className='locations__item'>
                  <Link href='/' className='locations__item-link tabs__item'>
                    <span>Brussels</span>
                  </Link>
                </li>
                <li className='locations__item'>
                  <Link
                    href='/'
                    className='locations__item-link tabs__item tabs__item--active'
                  >
                    <span>Amsterdam</span>
                  </Link>
                </li>
                <li className='locations__item'>
                  <Link href='/' className='locations__item-link tabs__item'>
                    <span>Hamburg</span>
                  </Link>
                </li>
                <li className='locations__item'>
                  <Link href='/' className='locations__item-link tabs__item'>
                    <span>Dusseldorf</span>
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
                <PlacesList offers={offers} screen='MainScreen' />
              </section>
              <div className='cities__right-section'>
                <section id='cities-map' className='cities__map map' />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Script
        src='https://api-maps.yandex.ru/2.1/?apikey=19d2c763-adea-4e63-892d-2e9a662f7873&lang=ru_RU'
        type='text/javascript'
        strategy='lazyOnload'
        onReady={() => {
          function init() {
            // Создание карты.
            const myMap = new ymaps.Map(
              'cities-map',
              { center: [55.76, 37.64], zoom: 7 },
              { searchControlProvider: 'yandex#search' }
            );

            const myGeoObjects = offersLocation.map((label) => {
              const { latitude, longitude, offerId } = label;
              return new ymaps.Placemark(
                [latitude, longitude],
                {
                  balloonContent: '<strong>серобуромалиновый</strong> цвет',
                  offerId,
                },
                {
                  preset: 'islands#greenDotIconWithCaption',
                  iconColor: 'yellow',
                }
              );
            });

            myGeoObjects.forEach((geoObject) => {
              myMap.geoObjects.add(geoObject);

              geoObject.events.add('mouseenter', (evt) => {
                evt
                  .get('target')
                  .options.set('preset', 'islands#greenDotIconWithCaption');
                evt.get('target').options.set('iconColor', 'blue');
              });
              geoObject.events.add('mouseleave', (evt) => {
                evt
                  .get('target')
                  .options.set('preset', 'islands#greenDotIconWithCaption');
                evt.get('target').options.set('iconColor', 'yellow');
              });
            });
          }

          ymaps.ready(init);
        }}
      />
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);

  const offerRepository = new OfferRepository();
  // await offerRepository.createOffers(adverts);
  let offers = await offerRepository.getAllOffers();
  offers = JSON.parse(offers);
  let offersLocation = await offerRepository.getAllOffersLocation();
  offersLocation = JSON.parse(offersLocation);

  return {
    props: {
      offers,
      offersLocation,
      session: {
        ...session,
        user: session?.user || null,
      },
    },
  };
}

export default MainScreen;
