import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function Header() {
  const { data: session, status } = useSession();
  const [currentStatus, setCurrentStatus] = useState(status);
  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            {/* при иребовании Sign in убираем header__logo-link--active */}
            <Link
              href='/'
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

          {currentStatus === 'authenticated' ? (
            <nav className='header__nav'>
              <ul className='header__nav-list'>
                <li className='header__nav-item user'>
                  <Link
                    href='/'
                    className='header__nav-link header__nav-link--profile'
                  >
                    <div className='header__avatar-wrapper user__avatar-wrapper' />
                    {/* <span class="header__login">Sign in</span> */}
                    <span className='header__user-name user__name'>
                      {session?.user.email}
                    </span>
                  </Link>
                </li>
                <li className='header__nav-item'>
                  <Link
                    href='/'
                    onClick={(evt) => {
                      evt.preventDefault();
                      signOut({ callbackUrl: '/' });
                    }}
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
                    href='/login/login'
                    className='header__nav-link header__nav-link--profile'
                    onClick={(evt) => {
                      evt.preventDefault();
                      signIn({ callbackUrl: '/' });
                    }}
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
