import { useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import Navbar from "./components/Navbar";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import { generateTranslation } from "./lib/generate";
import { useTheme } from "next-themes";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { resolvedTheme } = useTheme();

  const handleTranslate = async () => {
    if (!inputText.trim() || isLoading) return;

    setIsLoading(true);

    try {
      const result = await toast.promise(generateTranslation(inputText), {
        loading: "Translating...",
        success: "Translation ready",
        error: (err) =>
          err instanceof Error ? err.message : "Something went wrong.",
      });
      setOutputText(result);
    } catch {
      // toast.promise already surfaced the error; nothing else to do here.
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-137.5 w-95 flex-col overflow-hidden rounded-xl bg-background font-sans text-foreground">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style:
            resolvedTheme === "dark"
              ? { background: "#27272a", color: "#fafafa" }
              : undefined,
        }}
      />
      <Navbar />
      <main className="flex flex-1 flex-col overflow-y-auto p-4">
        <section className="mb-4">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
            <Sparkles
              aria-hidden="true"
              className="size-3 text-accent-foreground"
            />
            English to Arabizi
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-primary dark:bg-linear-to-br dark:from-cyan-500 dark:to-red-100 bg-clip-text text-transparent">
            Say it naturally, in Arabizi.
          </h1>
        </section>

        <section className="flex flex-1 flex-col gap-3" aria-label="Translator">
          <div className="flex flex-1 flex-col rounded-xl border border-border bg-card p-3 shadow-sm">
            <Label
              htmlFor="source-text"
              className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Arabizi
            </Label>
            <textarea
              id="source-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 resize-none bg-transparent text-sm leading-relaxed outline-none placeholder:text-muted-foreground/60"
              placeholder="Type something to translate..."
              aria-label="Arabizi text to translate"
            />
          </div>

          <Button
            variant="default"
            size="icon"
            className="size-8 self-center rounded-full shadow-sm shrink-0"
            aria-label="Translate"
            onClick={handleTranslate}
            disabled={isLoading || !inputText.trim()}
          >
            <ArrowDown
              className={`size-4 ${isLoading ? "animate-pulse" : ""}`}
            />
          </Button>

          <div className="flex flex-1 flex-col rounded-xl border border-border bg-muted/40 p-3">
            <span className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Arabic
            </span>
            {outputText ? (
              <p className="flex-1 whitespace-pre-wrap text-sm leading-relaxed">
                {outputText}
              </p>
            ) : (
              <p className="flex flex-1 items-center justify-center text-center text-xs leading-relaxed text-muted-foreground/70">
                Your translation will appear here
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
