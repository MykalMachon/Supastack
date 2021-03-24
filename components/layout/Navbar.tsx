import useAuth from 'hooks/useAuth';
import styles from './Navbar.module.scss';
import Link from 'next/link';

const Navbar = () => {
  const { auth } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles['nav-content']}>
        <Link href="/">
          <a className={styles.logo}>Supastack</a>
        </Link>
        {auth.user() ? (
          <>
            <div className={styles['nav-content__actions']}>
              <span>{auth.user().email}</span>
              <button
                onClick={() => {
                  auth.signOut();
                }}
              >
                Signout
              </button>
            </div>
          </>
        ) : (
          <div className={styles['nav-content__actions']}>
            <Link href="/signin">
              <a>Signin</a>
            </Link>
            <Link href="/signup">
              <a>Signup</a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
