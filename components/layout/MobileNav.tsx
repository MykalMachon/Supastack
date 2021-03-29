import HomeIcon from '@components/icons/HomeIcon';
import PencilIcon from '@components/icons/PencilIcon';
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
        <li>
          <Link href="/posts/new">
            <a title="write new post">
              <PencilIcon active={router.pathname == '/posts/new'} />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/settings">
            <a title="account settings">
              <UserIcon active={router.pathname == '/settings'} />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNav;
