interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ghost?: boolean;
  confirm?: boolean;
  className?: string;
}

function Button({ label, onClick, ghost, className, confirm }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`font-semibold px-4 py-2 rounded-md md:px-6 md:py-3 
      ${
        ghost
          ? "bg-transparent text-neutral-400 hover:text-blue-950"
          : confirm
          ? "bg-indigo-600 hover:bg-indigo-500 text-white"
          : "bg-blue-950/95 hover:bg-blue-900 text-white"
      } 
      
       ${className}`}
    >
      {label}
    </button>
  );
}

export default Button;
