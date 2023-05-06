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
  return <div>FormView</div>;
}

export default FormView;
