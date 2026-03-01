import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SidebarSectionCard({ title, children }) {
  return (
    <Card className="border-zinc-800/80 bg-zinc-900/40 shadow-none">
      <CardHeader className={"px-4 gap-0"}>
        <CardTitle className="text-lg font-semibold uppercase text-zinc-400">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 text-m leading-6 text-zinc-300">
        {children}
      </CardContent>
    </Card>
  );
}
