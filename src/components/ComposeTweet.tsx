import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function ComposeTweet() {
  return (
    <div className="pt-5 mt-3 border-black border rounded-md w-1/2">
      <div className="pb-3 pl-4">
        <Label>@username</Label>
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
