import SidebarItem from "../SidebarItem";

interface SidebarProps {
  currentStep: number;
}

const STEPS = ["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"];

function Sidebar({ currentStep }: SidebarProps) {
  return (
    <div className="w-full md:min-w-[275px] md:w-[315px] md:h-[650px] bg-cover bg-no-repeat md:bg-sidebar-desktop flex md:flex-col gap-4 md:gap-8 justify-center md:justify-start mb-3 mt-8 md:my-0 md:px-8 md:py-10">
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
