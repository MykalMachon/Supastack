import HomeIcon from '@components/icons/HomeIcon';
import UserIcon from '@components/icons/UserIcon';
import useAuth from 'hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './MobileNav.module.scss';

const MobileNav = () => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <nav className={styles['nav__mobile']}>
      <ul>
        <li>
          <Link href="/">
            <a title="Home">
              <HomeIcon active={router.pathname == '/'} />
            </a>
          </Link>
        </li>
        {user ? (
          <li>
            <Link href="/settings">
              <a title="account settings">
                <UserIcon active={router.pathname == '/settings'} />
              </a>
            </Link>
          </li>
        ) : (
          <li>
            <Link href="/signup">
              <a title="Sign Up">
                <UserIcon active={router.pathname == '/signup'} />
              </a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MobileNav;
