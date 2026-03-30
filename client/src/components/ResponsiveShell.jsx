import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePlannerUIStore } from "../stores/usePlannerUIStore";

export function ResponsiveShell({ children }) {
  const isMobile = useIsMobile();
  const selectedNode = usePlannerUIStore((s) => s.selectedNode);
  const showCoursePicker = usePlannerUIStore((s) => s.showCoursePicker);
  const closePanels = usePlannerUIStore((s) => s.closePanels);
  
  const handlePanelChange = (open) => {
    if (!open) closePanels();
  };
  if (isMobile) {
    const isPanelOpen = !!selectedNode || showCoursePicker;

    return (
      <Drawer open={isPanelOpen} onOpenChange={handlePanelChange}>
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
