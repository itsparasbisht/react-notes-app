import { createClient } from "@supabase/supabase-js";
const envs = import.meta.env;

export const supabase = createClient(
  envs.VITE_SUPABASE_URL,
  envs.VITE_SUPABASE_API_KEY
);
