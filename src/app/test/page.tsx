import { getStores } from "@/services/storeService";

export default async function Page() {
  const stores = await getStores();

  return <pre>{JSON.stringify(stores)}</pre>;
}
