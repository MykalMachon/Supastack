import { supabase } from '@utils/supabase';
import useSupabase from 'hooks/useSupabase';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({ user: null, auth: null });

export const AuthProvider = ({ children }) => {
  const client = useSupabase();
  const [auth, setAuth] = useState({
    user: supabase.auth.user(),
    auth: supabase.auth,
  });

  useEffect(() => {
    // setup listener
    if (client) {
      client.auth.onAuthStateChange(async (event, session) => {
        await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
          body: JSON.stringify({ event, session }),
        });
        setAuth({
          user: supabase.auth.user(),
          auth: supabase.auth,
        });
      });
    }
  }, [client]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
