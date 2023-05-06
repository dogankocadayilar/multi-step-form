import SidebarItem from "./SidebarItem";

interface SidebarProps {
  currentStep: number;
}

const STEPS = ["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"];

function Sidebar({ currentStep }: SidebarProps) {
  return (
    <div className="w-full md:min-w-[275px] md:w-[275px] md:h-full md:bg-sidebar-desktop flex md:flex-col gap-4 md:gap-6 justify-center my-3 md:my-0 md:p-5">
      {STEPS.map((step, index) => (
        <SidebarItem
          key={index}
          isCurrent={index === currentStep}
          step={index + 1}
          title={step}
        />
      ))}
    </div>
  );
}

export default Sidebar;
