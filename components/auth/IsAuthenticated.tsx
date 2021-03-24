import useAuth from 'hooks/useAuth';
import Link from 'next/link';

const IsAuthenticated = ({ children }) => {
  const { user } = useAuth();

  if (user) return <>{children}</>;
  return (
    <div className="card card__noAuth">
      <h3>You need to login</h3>
      <p>
        You need to login to see this!{' '}
        <Link href={'/signin'}>
          <a>Signin</a>
        </Link>{' '}
        or <Link href={'/signup'}>Signup</Link>
      </p>
    </div>
  );
};

export default IsAuthenticated;
