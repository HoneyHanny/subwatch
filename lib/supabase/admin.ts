import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/lib/types/database/database.type'

// Never import this in a Client Component. Server-only.
function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

export const admin = createAdminClient()