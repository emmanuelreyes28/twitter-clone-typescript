import ComposeTweet from "@/components/compose-tweet";
import LogoutButton from "@/components/logout-button";

export default function Timeline() {
  return (
    <div>
      <div className="grid justify-items-end">
        <LogoutButton />
      </div>
      <div className="flex items-center justify-center">
        <ComposeTweet></ComposeTweet>
      </div>
    </div>
  );
}
