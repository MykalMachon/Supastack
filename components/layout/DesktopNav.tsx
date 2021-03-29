import useAuth from 'hooks/useAuth';
import Link from 'next/link';
import styles from './DesktopNav.module.scss';

const DesktopNav = () => {
  const { auth } = useAuth();

  if (auth.user()) {
    return (
      <div className={styles['nav__desktop']}>
        <Link href="/settings">
          <a>Settings</a>
        </Link>
      </div>
    );
  } else {
    return (
      <div className={styles['nav__desktop']}>
        <Link href="/signin">
          <a>Signin</a>
        </Link>
        <Link href="/signup">
          <a>Signup</a>
        </Link>
      </div>
    );
  }
};

export default DesktopNav;
