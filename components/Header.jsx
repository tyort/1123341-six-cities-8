import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link href="#" passRef>
              <a className="header__logo-link header__logo-link--active">
                <Image className="header__logo" src="/img/logo.svg" alt="6 cities logo" width={81} height={41}/>
              </a>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link href="#" passRef>
                  <a className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </Link>
              </li>
              <li className="header__nav-item">
                <Link href="#" passRef>
                  <a className="header__nav-link">
                    <span className="header__signout">Sign out</span>
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
