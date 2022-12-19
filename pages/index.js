import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import PlacesList from '../components/PlacesList';
import Sorting from '../components/Sorting';
import { changeCity } from '../src/store/action';

import OfferRepository from '../src/repositories/OfferRepository';

const letSortOffers = (sortName) => {
  switch (sortName) {
    case 'Top rated first':
      return (a, b) => Number(b.rating) - Number(a.rating);
    case 'Price: low to high':
      return (a, b) => a.price - b.price;
    case 'Price: high to low':
      return (a, b) => b.price - a.price;
    default:
      return () => 0;
  }
};

function MainScreen({ offers, offersLocation, cities }) {
  const [hoveredOffer, setHoveredOffer] = useState(null);
  console.log(hoveredOffer?.id);
  const dispatch = useDispatch();
  const { currentCity, sortName } = useSelector((state) => state);
  const currentCityDB = cities.find((city) => city.name === currentCity);
  const offersForVisual = offers
    .filter((offer) => offer.city.name === currentCity)
    .sort(letSortOffers(sortName));

  const handleLinkClick = (evt) => {
    dispatch(changeCity({ currentCity: evt.target.innerText }));
  };

  const handleCardHover = (offer) => {
    setHoveredOffer(offer);
  };

  const init = () => {
    // Создание карты.
    const myMap = new ymaps.Map(
      'cities-map',
      {
        center: [
          currentCityDB.location.latitude,
          currentCityDB.location.longitude,
        ],
        zoom: 10,
      },
      { searchControlProvider: 'yandex#search' }
    );

    document.addEventListener('click', (evt) => {
      const citiesNames = cities.map((city) => city.name);
      if (citiesNames.includes(evt.target.innerText)) {
        const center = cities.find(
          (city) => city.name === evt.target.innerText
        );
        myMap.setCenter([center.location.latitude, center.location.longitude]);
      }
    });

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
  };

  return (
    <>
      <div className='page page--gray page--main'>
        <Header />

        <main className='page__main page__main--index'>
          <h1 className='visually-hidden'>Cities</h1>
          <div className='tabs'>
            <section className='locations container'>
              <ul className='locations__list tabs__list'>
                {cities.map((city) => {
                  const isActive =
                    currentCity === city.name ? 'tabs__item--active' : '';
                  return (
                    <li key={city.id} className='locations__item'>
                      <Link
                        href={{
                          pathname: '/',
                          query: { city: city.name },
                        }}
                        replace
                        onClick={handleLinkClick}
                        className={`locations__item-link tabs__item ${isActive}`}
                      >
                        <span>{city.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
          <div className='cities'>
            <div className='cities__places-container container'>
              <section className='cities__places places'>
                <h2 className='visually-hidden'>Places</h2>
                <b className='places__found'>
                  {offersForVisual.length}{' '}
                  {offersForVisual.length <= 1 ? 'place' : 'places'} to stay in{' '}
                  {currentCity}
                </b>
                <Sorting />
                <PlacesList
                  handleCardHover={handleCardHover}
                  offers={offersForVisual}
                  screen='MainScreen'
                />
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
        onReady={() => ymaps.ready(init)}
      />
    </>
  );
}

export async function getServerSideProps() {
  const offerRepository = new OfferRepository();
  let offers = await offerRepository.getAllOffers();
  offers = JSON.parse(offers);
  let offersLocation = await offerRepository.getAllOffersLocation();
  offersLocation = JSON.parse(offersLocation);
  let cities = await offerRepository.getAllCities();
  cities = JSON.parse(cities);

  return {
    props: {
      offers,
      offersLocation,
      cities,
    },
  };
}

export default MainScreen;
