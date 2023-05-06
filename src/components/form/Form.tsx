import { useState, useMemo } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Heading from "../Heading";
import FormView from "./FormView";
import Sidebar from "./Sidebar";
import Input from "../inputs/Input";

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
      isMonthly: true,
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.SUMMARY) return onNext();

    // Handle submit action
    console.log(data);
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
    <div className="flex flex-col gap-4 md:gap-8">
      <Heading
        title="Personal info"
        subTitle="Please provide your name, email address and phone number."
      />
      <Input
        errors={errors}
        id="name"
        label="Name"
        register={register}
        placeholder="e.g. Stephen King"
        required
      />
      <Input
        errors={errors}
        id="email"
        label="Email Address"
        register={register}
        placeholder="e.g. stephenking@lorem.com"
        required
      />
      <Input
        errors={errors}
        id="phone"
        label="Phone Number"
        register={register}
        placeholder="e.g. +1 234 567 890"
        required
      />
    </div>
  );

  if (step === STEPS.PLAN) {
    bodyContent = (
      <div className="">
        <Heading
          title="Select your plan"
          subTitle="You have the option monthly or yearly billing."
        />
      </div>
    );
  }

  return (
    <div className="md:flex  md:bg-white md:rounded-2xl md:p-5 md:shadow-lg">
      <Sidebar currentStep={step} />
      <FormView
        actionLabel={actionLabel}
        body={bodyContent}
        onSubmit={handleSubmit(onSubmit)}
        secondaryAction={step === STEPS.INFO ? undefined : onBack}
        secondaryActionLabel={secondaryActionLabel}
      />
    </div>
  );
}

export default Form;
