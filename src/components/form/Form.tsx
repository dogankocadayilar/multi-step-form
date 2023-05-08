import { useState, useMemo, createContext, useCallback } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { ADDONS, PLANS } from "../../data/Constants";
import Heading from "../Heading";
import FormView from "./FormView";
import Sidebar from "./Sidebar";
import Input from "../inputs/Input";
import Toggle from "../Toggle";
import Plan from "../inputs/Plan";
import Addon from "../inputs/Addon";
import comfirmedIcon from "../../assets/images/icon-thank-you.svg";

export const BillingContext = createContext(true);

enum STEPS {
  INFO = 0,
  PLAN = 1,
  ADDONS = 2,
  SUMMARY = 3,
  CONFIRMED = 4,
}

function Form() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      plan: {},
      addons: [],
      isMonthly: true,
    },
  });

  const isMonthly = watch("isMonthly");
  const plan = watch("plan");
  const addons = watch("addons");

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

  const onSubmit: SubmitHandler<FieldValues> = (_) => {
    if (step !== STEPS.SUMMARY) return onNext();

    // Handle submit action
    setStep(STEPS.CONFIRMED);
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
      <div className="flex flex-col gap-4 md:gap-10">
        <Heading
          title="Select your plan"
          subTitle="You have the option monthly or yearly billing."
        />
        <div className="flex flex-col md:flex-row gap-3 md:gap-5 md:justify-between">
          {PLANS.map((item) => (
            <Plan
              key={item.title}
              plan={item}
              isSelected={item.title === plan.title}
              onClick={(value) => setCustomValue("plan", value)}
            />
          ))}
        </div>
        <Toggle
          isMonthly={isMonthly}
          onClick={(value) => setCustomValue("isMonthly", value)}
        />
      </div>
    );
  }

  const toggleAddon = useCallback(
    (addon: IAddon) => {
      const isAddon = addons.find((a: IAddon) => a.title === addon.title);

      if (isAddon) {
        const newAddons = addons.filter(
          (a: IAddon) => a.title !== isAddon.title
        );
        setCustomValue("addons", newAddons);
      } else {
        setCustomValue("addons", [...addons, addon]);
      }
    },
    [addons]
  );

  if (step === STEPS.ADDONS) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Pick add-ons"
          subTitle="Add-ons help enchance your gaming experience."
        />
        <div className="flex flex-col gap-3 md:gap-5">
          {ADDONS.map((addon) => (
            <Addon
              key={addon.title}
              addon={addon}
              isSelected={
                addons.find((a: IAddon) => a.title === addon.title) !==
                undefined
              }
              onClick={(value) => toggleAddon(value)}
            />
          ))}
        </div>
      </div>
    );
  }

  const addonsTotal = useMemo(() => {
    // @ts-ignore
    return addons.reduce((accumulator, addon) => {
      return accumulator + addon.billing;
    }, 0);
  }, [addons]);

  if (step === STEPS.SUMMARY) {
    bodyContent = (
      <div className="flex flex-col gap-4 md:gap-8">
        <Heading
          title="Finishing up"
          subTitle="Double-check everything looks OK before confirming."
        />
        <div className="bg-slate-50 p-5 rounded-lg">
          <div className=" text-blue-900 font-bold flex justify-between pb-3 items-center">
            <div className="capitalize">
              <div className="">
                {plan.title} ({isMonthly ? "Monthly" : "Yearly"})
              </div>
              <div
                onClick={() => setStep(STEPS.PLAN)}
                className="underline text-neutral-400 hover:text-blue-900 font-medium cursor-pointer transition"
              >
                Change
              </div>
            </div>
            <div>
              ${isMonthly ? `${plan.billing}/mo` : `${plan.billing * 10}/yr`}
            </div>
          </div>
          <hr />
          {addons.map((addon: IAddon) => (
            <div
              key={addon.title}
              className="flex justify-between pt-3 text-neutral-400"
            >
              <div className="capitalize">{addon.title}</div>
              <div className="text-blue-900 font-semibold">
                +$
                {isMonthly ? `${addon.billing}/mo` : `${addon.billing * 10}/yr`}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="text-neutral-400">
            Total ({isMonthly ? "per month" : "per year"})
          </div>
          <div className="text-blue-900 font-bold">
            +$
            {isMonthly
              ? `${addonsTotal + plan.billing}/mo`
              : `${(addonsTotal + plan.billing) * 10}/yr`}
          </div>
        </div>
      </div>
    );
  }

  if (step === STEPS.CONFIRMED) {
    bodyContent = (
      <div className="flex flex-col justify-center items-center h-full py-10 gap-5 md:py-0">
        <img src={comfirmedIcon} alt="Thank You" className="w-14 md:w-16" />
        <Heading
          title="Thank you!"
          subTitle="Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, plase feel free to email us at support@loregaming.com."
          center
        />
      </div>
    );
  }

  return (
    <div className="md:flex md:bg-white md:rounded-2xl md:p-5 md:shadow-lg">
      <Sidebar currentStep={step} />
      <BillingContext.Provider value={isMonthly}>
        <FormView
          step={step}
          actionLabel={actionLabel}
          body={bodyContent}
          onSubmit={handleSubmit(onSubmit)}
          secondaryAction={step === STEPS.INFO ? undefined : onBack}
          secondaryActionLabel={secondaryActionLabel}
        />
      </BillingContext.Provider>
    </div>
  );
}

export default Form;
