import "server-only";

import createClient from "../../utils/supabase-server";
import Thermometer from "./thermometer";

// do not cache this page
export const revalidate = 0;

export default async function Realtime() {
  const supabase = createClient();
  const { data } = await supabase.from("monitor").select("*");

  return <Thermometer monitor={data || []} />;
}
