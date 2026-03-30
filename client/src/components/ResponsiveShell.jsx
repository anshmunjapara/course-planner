import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/useIsMobile";

export function ResponsiveShell({ children, open, onOpenChange }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <div className="overflow-y-auto p-4">{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <aside className="lg:flex-[1.2] md:flex-2 h-screen shrink-0 overflow-y-auto border-l border-zinc-800 bg-zinc-950 text-zinc-100 shadow-xl">
      {children}
    </aside>
  );
}
