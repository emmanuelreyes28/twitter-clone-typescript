import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import LogoutButton from "@/components/logout-button";
import AccountForm from "@/components/account-form";

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div>
      <div className="grid justify-items-end">
        <LogoutButton />
      </div>

      <AccountForm session={session} />
    </div>
  );
}
