import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          The page you’re looking for doesn’t exist, or the link may be broken.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            variant="secondary"
            className="shadow-md shadow-black/30"
          >
            <Link to="/">Go to Home</Link>
          </Button>
          <Button asChild className="shadow-md shadow-black/30">
            <Link to="/planner">Open Planner</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
