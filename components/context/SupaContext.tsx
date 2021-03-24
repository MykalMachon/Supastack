import { supabase } from '@utils/supabase';
import { createContext, useEffect } from 'react';

export const SupaContext = createContext({
  client: supabase,
});

export const SupaProvider = ({ children }) => {
  return (
    <SupaContext.Provider value={{ client: supabase }}>
      {children}
    </SupaContext.Provider>
  );
};
