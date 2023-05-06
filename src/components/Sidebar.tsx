interface SidebarProps {
  step: number;
}

function Sidebar({ step }: SidebarProps) {
  return <div className="h-full bg-sidebar-desktop"></div>;
}

export default Sidebar;
