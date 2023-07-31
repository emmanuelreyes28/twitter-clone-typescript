"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  // create a supabase client configured to use cookies
  const supabase = createClientComponentClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/signin");
  };
  return (
    <button
      className="py-2 px-4 mr-4 mt-2 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover hover:underline"
      onClick={signOut}
    >
      Log Out
    </button>
  );
}
