import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import ComposeTweet from "@/components/compose-tweet";
import LogoutButton from "@/components/logout-button";

export default async function Timeline() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div>
      <div className="grid justify-items-end">
        <LogoutButton />
      </div>
      <div className="flex items-center justify-center">
        <ComposeTweet session={session} />
      </div>
    </div>
  );
}
