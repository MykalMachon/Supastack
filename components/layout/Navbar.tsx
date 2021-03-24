import useAuth from 'hooks/useAuth';
import Link from 'next/link';

const Navbar = () => {
  const { auth } = useAuth();

  return (
    <nav className="navbar">
      <strong>Supastack</strong>
      {auth.user() ? (
        <>
          <p>
            {auth.user().email}
            <button
              onClick={() => {
                auth.signOut();
              }}
            >
              Signout
            </button>
          </p>
        </>
      ) : (
        <>
          <Link href="/signin">
            <a>Signin</a>
          </Link>
          <Link href="/signin">
            <a>Signup</a>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
