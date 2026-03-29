export function SidebarShell({ children }) {
  return (
    <aside className="lg:flex-[1.2] md:flex-2 h-screen shrink-0 overflow-y-auto border-l border-zinc-800 bg-zinc-950 text-zinc-100 shadow-xl">
      {children}
    </aside>
  );
}
