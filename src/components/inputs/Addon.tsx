import { useContext } from "react";
import { BillingContext } from "../form/Form";

interface AddonProps {
  addon: IAddon;
  isSelected: boolean;
  onClick: (value: IAddon) => void;
}

function Addon({ isSelected, onClick, addon }: AddonProps) {
  const isMonthly = useContext(BillingContext);

  const { billing, title, desc } = addon;

  return (
    <label
      htmlFor={title}
      className={`flex items-center py-2 px-4 border rounded-lg cursor-pointer md:w-full hover:border-blue-900 transition  ${
        isSelected
          ? "border-blue-900 bg-blue-50"
          : "bg-transparent border-neutral-200"
      }`}
    >
      <input
        type="checkbox"
        id={title}
        onChange={() => onClick(addon)}
        className="w-5 md:w-6 aspect-square mx-2 mr-5"
        checked={isSelected}
      />
      <div className="flex justify-between w-full items-center">
        <div>
          <div className="capitalize font-bold text-blue-900 text-sm md:text-lg">
            {title}
          </div>
          <div className="text-neutral-400 text-xs md:text-base">{desc}</div>
        </div>
        <div className="text-blue-800 text-sm md:text-base font-semibold">
          +${isMonthly ? `${billing}/mo` : `${billing * 10}/yr`}
        </div>
      </div>
    </label>
  );
}

export default Addon;
