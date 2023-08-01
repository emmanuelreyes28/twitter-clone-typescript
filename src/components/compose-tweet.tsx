"use client";

import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { useState, useEffect, useCallback } from "react";

export default function ComposeTweet({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string | null>(null);
  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  return (
    <div className="pt-5 mt-3 border-black border rounded-md w-1/2">
      <div className="pb-3 pl-4">
        <Label>@{username}</Label>
      </div>
      <div className="px-4">
        <Card>
          <Textarea
            className="resize-none"
            placeholder="Compose a tweet"
            maxLength={280}
            required
          />
        </Card>
      </div>
      <div className="flex justify-end py-3 pr-4">
        <Button>Tweet</Button>
      </div>
    </div>
  );
}
