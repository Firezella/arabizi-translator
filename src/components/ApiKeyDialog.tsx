import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { KeyRound, LockKeyhole } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

function ApiKeyDialog() {
  const [key, setKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [hasKey, setHasKey] = useState(true); // assume true until checked, avoids a red flash on first paint

  const handleSave = () => {
    chrome.storage.local.set({ apiKey: key }, () => {
      setSaved(true);
      setHasKey(Boolean(key.trim()));
      setTimeout(() => setSaved(false), 1500);
    });
  };

  useEffect(() => {
    chrome.storage.local.get("apiKey", (result) => {
      const stored = (result.apiKey as string) ?? "";
      setKey(stored);
      setHasKey(Boolean(stored.trim()));
    });
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={hasKey ? "outline" : "destructive"}
          size="sm"
          className={
            hasKey ? "gap-2 bg-transparent shrink-0" : "gap-2 shrink-0"
          }
        >
          <KeyRound data-icon="inline-start" className="size-4" />
          <span>{hasKey ? "API key" : "Add API key"}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-90 p-4">
        <DialogHeader>
          <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <LockKeyhole aria-hidden="true" className="size-5" />
          </div>
          <DialogTitle>Connect your translation API</DialogTitle>
          <DialogDescription>
            Add your API key to enable translations. Your key stays stored
            securely in this extension.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 py-3">
          <Label htmlFor="api-key">API key</Label>
          <Input
            id="api-key"
            type="password"
            placeholder="sk-••••••••••••••••"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <p className="text-xs leading-relaxed text-muted-foreground">
            You can find this in your provider dashboard.
          </p>
        </div>
        <DialogFooter>
          <Button type="button" className="w-full" onClick={handleSave}>
            {saved ? "Saved" : "Save API key"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ApiKeyDialog;
