import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

function Header() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            {/* при иребовании Sign in убираем header__logo-link--active */}
            <Link
              href='#'
              className='header__logo-link header__logo-link--active'
            >
              <Image
                className='header__logo'
                src='/img/logo.svg'
                alt='6 cities logo'
                width={81}
                height={41}
              />
            </Link>
          </div>

          {status === 'authenticated' ? (
            <nav className='header__nav'>
              <ul className='header__nav-list'>
                <li className='header__nav-item user'>
                  <Link
                    href='#'
                    className='header__nav-link header__nav-link--profile'
                  >
                    <div className='header__avatar-wrapper user__avatar-wrapper' />
                    {/* <span class="header__login">Sign in</span> */}
                    <span className='header__user-name user__name'>
                      Oliver.conner@gmail.com
                    </span>
                  </Link>
                </li>
                <li className='header__nav-item'>
                  <Link
                    href='#'
                    onClick={() => signOut()}
                    className='header__nav-link'
                  >
                    <span className='header__signout'>Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          ) : (
            <nav className='header__nav'>
              <ul className='header__nav-list'>
                <li className='header__nav-item user'>
                  <Link
                    href='#'
                    className='header__nav-link header__nav-link--profile'
                    onClick={() => signIn()}
                  >
                    <div className='header__avatar-wrapper user__avatar-wrapper' />
                    <span className='header__login'>Sign in</span>
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
