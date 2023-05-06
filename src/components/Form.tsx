import { useState, useMemo } from "react";
import { useForm, FieldValues } from "react-hook-form";
import Heading from "./Heading";
import FormView from "./FormView";
import Sidebar from "./Sidebar";

enum STEPS {
  INFO = 0,
  PLAN = 1,
  ADDONS = 2,
  SUMMARY = 3,
}

function Form() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      addons: [],
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const [step, setStep] = useState(STEPS.INFO);

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const onBack = () => {
    setStep((prev) => prev - 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.SUMMARY) {
      return "Confirm";
    }

    return "Next Step";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return undefined;
    }

    return "Go Back";
  }, [step]);

  let bodyContent = (
    <div className="">
      <Heading
        title="Personal info"
        subTitle="Please provide your name, email address and phone number."
      />
    </div>
  );

  return (
    <div className="md:flex m-5 md:bg-white rounded-2xl md:p-5 shadow-sm">
      <Sidebar currentStep={step} />
      <FormView
        actionLabel={actionLabel}
        body={bodyContent}
        onSubmit={() => {}}
        secondaryAction={() => {}}
        secondaryActionLabel={secondaryActionLabel}
      />
    </div>
  );
}

export default Form;
