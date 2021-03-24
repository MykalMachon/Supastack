import useAuth from 'hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const IsAuthenticated = ({ children, strict }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (strict && !user) {
      router.push('/signin');
    }
  }, [user]);

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
