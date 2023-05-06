interface ToggleProps {
  isMonthly: boolean;
  onClick: (value: boolean) => void;
}

function Toggle({ isMonthly, onClick }: ToggleProps) {
  return (
    <div className="flex gap-3 bg-slate-50 w-full justify-evenly md:justify-center md:gap-10 py-3">
      <div
        className={`transition ${
          isMonthly ? "text-blue-900 font-bold" : "text-neutral-600 font-medium"
        }`}
      >
        Monthly
      </div>
      <div
        onClick={() => onClick(!isMonthly)}
        className="bg-blue-950 w-12 flex items-center rounded-full cursor-pointer relative"
      >
        <div
          className={`w-6 h-6 bg-white rounded-full border-[5px] border-blue-950 absolute transition ${
            isMonthly ? "translate-x-[0%]" : "translate-x-[100%]"
          } `}
        />
      </div>
      <div
        className={`transition ${
          isMonthly ? "text-neutral-600 font-medium" : "text-blue-900 font-bold"
        }`}
      >
        Yearly
      </div>
    </div>
  );
}

export default Toggle;
