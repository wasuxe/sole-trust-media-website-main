import { createClient, SupabaseClient } from "@supabase/supabase-js"

let browserClient: SupabaseClient<any, "public", any> | undefined

export function getSupabaseBrowserClient() {
  if (browserClient) return browserClient

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-key"

  browserClient = createClient<any>(url, key)
  return browserClient
}

export const supabase = new Proxy({} as SupabaseClient<any, "public", any>, {
  get(_target, prop) {
    const client = getSupabaseBrowserClient()
    const val = (client as any)[prop]
    return typeof val === "function" ? val.bind(client) : val
  },
})
