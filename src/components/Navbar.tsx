import { Languages } from "lucide-react";
import ApiKeyDialog from "./ApiKeyDialog";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <header className="border-b border-border bg-card">
      <nav
        className="flex h-14 w-full items-center justify-between px-3"
        aria-label="Main navigation"
      >
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary dark:bg-linear-to-br dark:from-cyan-500 dark:to-red-100 text-primary-foreground shadow-sm">
            <Languages aria-hidden="true" className="size-4" />
          </div>
          <span className="truncate text-sm font-semibold tracking-tight">
            arabizi translator
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <ThemeToggle />
          <ApiKeyDialog />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
