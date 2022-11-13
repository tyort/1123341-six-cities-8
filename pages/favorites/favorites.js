import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import PlacesList from '../../components/PlacesList';
import OfferRepository from '../../src/repositories/OfferRepository';

function FavoritesScreen({ offers }) {
  const router = useRouter();
  const authorizationStatus = 'AUTH';

  useEffect(() => {
    authorizationStatus !== 'AUTH' && router.push('/login/login');
  }, []); // Пустой массив говорит о том, что хук сработает один раз после рендера компонента, даже при изменении состояний;

  return (
    <div className='page'>
      <Header />

      <main className='page__main page__main--favorites'>
        <div className='page__favorites-container container'>
          <section className='favorites'>
            <h1 className='favorites__title'>Saved listing</h1>
            <ul className='favorites__list'>
              <li className='favorites__locations-items'>
                <div className='favorites__locations locations locations--current'>
                  <div className='locations__item'>
                    <a className='locations__item-link' href='#'>
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <PlacesList offers={offers} screen='FavoritesScreen' />
              </li>

              <li className='favorites__locations-items'>
                <div className='favorites__locations locations locations--current'>
                  <div className='locations__item'>
                    <Link href='#' className='locations__item-link'>
                      <span>Cologne</span>
                    </Link>
                  </div>
                </div>
                <PlacesList offers={offers} screen='FavoritesScreen' />
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const offerRepository = new OfferRepository();
  let offers = await offerRepository.getAllOffers();
  offers = JSON.parse(JSON.stringify(offers));

  return {
    props: {
      offers,
    },
  };
}

export default FavoritesScreen;
