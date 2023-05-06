interface FormViewProps {
  onSubmit: () => void;
  body: React.ReactElement;
  actionLabel: string;
  secondaryActionLabel?: string;
  secondaryAction?: () => void;
}

function FormView({
  actionLabel,
  body,
  onSubmit,
  secondaryAction,
  secondaryActionLabel,
}: FormViewProps) {
  return (
    <div className="bg-white rounded-xl md:px-20">
      {/* Body */}
      <div className="relative p-6 ">{body}</div>
      {/* Footer */}
    </div>
  );
}

export default FormView;
