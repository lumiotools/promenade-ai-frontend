import { Mail, Coins } from "lucide-react";

export function TopNav() {
  return (
    <div className="flex items-center justify-end gap-4 px-4 py-2 border-b">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Mail className="h-4 w-4" />
        <span>customer@promenade-ai.com</span>
      </div>
      <div className="flex items-center gap-2 bg-muted rounded-full px-3 py-1">
        <Coins className="h-4 w-4 text-yellow-500" />
        <span className="text-sm">8 Credits</span>
      </div>
    </div>
  );
}
