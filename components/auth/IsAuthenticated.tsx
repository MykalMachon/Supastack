import useAuth from 'hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactChildren, useEffect } from 'react';

type isAuthenticatedProps = {
  children: any;
  strict?: boolean;
};

const IsAuthenticated = ({ children, strict }: isAuthenticatedProps) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (strict && !user) {
      router.push('/login');
    }
  }, [user]);

  if (user) return <>{children}</>;
  return (
    <div className="card card__noAuth">
      <h3>You need to login</h3>
      <p>
        You need to login to see this!{' '}
        <Link href={'/login'}>
          <a>Login</a>
        </Link>{' '}
        or <Link href={'/signup'}>Signup</Link>
      </p>
    </div>
  );
};

export default IsAuthenticated;
