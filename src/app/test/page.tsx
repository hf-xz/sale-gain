import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: stores } = await supabase.from("store").select();

  return <pre>{JSON.stringify(stores)}</pre>;
}
