import { useContext } from "react";
import { BillingContext } from "../form/Form";

interface PlanProps {
  title: string;
  billing: number;
  icon: string;
  isSelected: boolean;
  onClick: (value: string) => void;
}

function Plan({ billing, icon, title, isSelected, onClick }: PlanProps) {
  const isMonthly = useContext(BillingContext);
  return (
    <div
      onClick={() => onClick(title)}
      className={`flex gap-3 md:gap-10 p-3 border rounded-lg cursor-pointer md:flex-col md:w-full hover:border-blue-900 transition ${
        isSelected
          ? "border-blue-900 bg-blue-50"
          : "bg-transparent border-neutral-200"
      }`}
    >
      <img src={icon} alt="Icon" className="md:w-14" />
      <div>
        <div className="capitalize font-bold text-blue-900">{title}</div>
        <div className="text-neutral-400">
          ${isMonthly ? `${billing}/mo` : `${billing * 10}/yr`}
        </div>
        {!isMonthly && (
          <div className="text-sm text-blue-900 font-semibold">
            2 months free
          </div>
        )}
      </div>
    </div>
  );
}

export default Plan;
