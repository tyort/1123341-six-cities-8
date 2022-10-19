import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer container">
      <Link href="#" passRef>
        <a className="footer__logo-link">
          <Image className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width={64} height={33}/>
        </a>
      </Link>
    </footer>
  )
}

export default Footer;
