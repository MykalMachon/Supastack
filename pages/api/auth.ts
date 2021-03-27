import { supabase } from '@utils/supabase';

export default function handler(req, res) {
  supabase.auth.api.setAuthCookie(req, res);
}
