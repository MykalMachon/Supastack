import { AuthContext } from '@components/context/AuthContext';
import { useContext, useMemo } from 'react';

const useAuth = () => {
  const { user, auth } = useContext(AuthContext);
  const returnValue = useMemo(() => {
    return { user, auth };
  }, [user, auth]);
  return returnValue;
};

export default useAuth;
