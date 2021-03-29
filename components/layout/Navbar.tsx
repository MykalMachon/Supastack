import styles from './Navbar.module.scss';
import Link from 'next/link';

import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles['nav-content']}>
        <Link href="/">
          <a className={styles.logo}>Supastack</a>
        </Link>
        <DesktopNav />
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
