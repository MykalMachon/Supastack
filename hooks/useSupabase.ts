import { SupabaseClient } from '@supabase/supabase-js';
import { useContext } from 'react';
import { SupaContext } from '../components/context/SupaContext';

const useSupabase = (): SupabaseClient => {
  const supabase = useContext(SupaContext);
  return supabase.client;
};

export default useSupabase;
