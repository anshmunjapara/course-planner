import "./Sidebar.css";

export function Sidebar({ selectedNode }) {
  if (!selectedNode) {
    return (
      <div className="sidebar">
        <div className="sidebar-empty">
          <p>Click on a course to view details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <h2 className="sidebar-title">{selectedNode.label}</h2>
      </div>
    </div>
  );
}
