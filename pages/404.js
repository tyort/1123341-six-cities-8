import Link from 'next/link';
import Image from 'next/image';

function NotFoundScreen() {
  return (
    <>
      <div className='header__wrapper'>
        <div className='header__left'>
          <Link href='#'>
            <a
              className='header__logo-link header__logo-link--active'
              style={{ pointerEvents: 'none' }}
            >
              <Image
                className='header__logo'
                src='/img/logo.svg'
                alt='6 cities logo'
                width={81}
                height={41}
              />
            </a>
          </Link>
        </div>
      </div>
      <h1>404. Fucking page not found</h1>
      <Link href='/' passHref>
        <a>Вернуться на главную</a>
      </Link>
    </>
  );
}

export default NotFoundScreen;