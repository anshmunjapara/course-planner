import { useCallback, useState } from "react";

import { useReactFlow } from "@xyflow/react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function NodeSearchInternal({
  className,
  onSearch,
  onSelectNode,
  open,
  onOpenChange,
  onKeyDown,
  ...props
}) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchString, setSearchString] = useState("");
  const { getNodes, fitView, setNodes } = useReactFlow();

  const defaultOnSearch = useCallback(
    (searchString) => {
      const nodes = getNodes();
      return nodes.filter((node) =>
        node.data.label.toLowerCase().includes(searchString.toLowerCase()),
      );
    },
    [getNodes],
  );

  const onChange = useCallback(
    (searchString) => {
      setSearchString(searchString);
      if (searchString.length > 0) {
        onOpenChange?.(true);
        const results = (onSearch || defaultOnSearch)(searchString);
        setSearchResults(results);
      }
    },
    [onSearch, onOpenChange],
  );

  const defaultOnSelectNode = useCallback(
    (node) => {
      setNodes((nodes) =>
        nodes.map((n) => (n.id === node.id ? { ...n, selected: true } : n)),
      );
      fitView({ nodes: [node], duration: 500 });
    },
    [fitView, setNodes],
  );

  const onSelect = useCallback(
    (node) => {
      (onSelectNode || defaultOnSelectNode)?.(node);
      setSearchString("");
      onOpenChange?.(false);
    },
    [onSelectNode, defaultOnSelectNode, onOpenChange],
  );

  return (
    <>
      <CommandInput
        placeholder="Search nodes..."
        onValueChange={onChange}
        value={searchString}
        onKeyDown={onKeyDown}
        onFocus={() => onOpenChange?.(true)}
      />
      {open && (
        <CommandList>
          {searchResults.length === 0 ? (
            <CommandEmpty>No results found. {searchString}</CommandEmpty>
          ) : (
            <CommandGroup heading="Nodes">
              {searchResults.map((node) => {
                return (
                  <CommandItem key={node.id} onSelect={() => onSelect(node)}>
                    <span>{node.data.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      )}
    </>
  );
}

export function NodeSearch({ className, onSearch, onSelectNode, ...props }) {
  const [open, setOpen] = useState(false);

  const handOnKeyDown = (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <Command
      shouldFilter={false}
      className="rounded-lg border shadow-md md:min-w-[450px]"
    >
      <NodeSearchInternal
        className={className}
        onSearch={onSearch}
        onSelectNode={onSelectNode}
        open={open}
        onKeyDown={handOnKeyDown}
        onOpenChange={setOpen}
        {...props}
      />
    </Command>
  );
}

export function NodeSearchDialog({
  className,
  onSearch,
  onSelectNode,
  open,
  onOpenChange,
  title = "Node Search",
  ...props
}) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <NodeSearchInternal
        className={className}
        onSearch={onSearch}
        onSelectNode={onSelectNode}
        open={open}
        onOpenChange={onOpenChange}
        {...props}
      />
    </CommandDialog>
  );
}
