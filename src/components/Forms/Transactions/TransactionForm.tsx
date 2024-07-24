"use client";

import { useEffect, useState } from "react";
import { FieldConfig, GenericFormProps } from "../FormControlWrapper";
import { Transaction } from "@/types/types";
import TransactionFormFields from "./TransactionFormFields";
import PartnerFormFields from "../Partners/PartnerFormFields";
import GenericForm from "../GenericForm";

export type TransactionFormProps = GenericFormProps & {
  transaction?: Transaction;
  onStepChange: (isLast: boolean) => void;
};

const TransactionForm = (props: TransactionFormProps) => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    props.onStepChange(step === 3);
  }, [step, props]);

  const handleNext = async () => {
    // const isValid = await props.trigger(
    //   TransactionFormFields.map((config: FieldConfig) => config.name)
    // );
    // console.log(isValid)
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div>
      {step === 1 && (
        <GenericForm {...{ ...props, fields: TransactionFormFields }} />
      )}
      {step === 2 && (
        <GenericForm
          {...{ ...props, fields: PartnerFormFields.BillingPartnerInformationFormFields }}
        />
      )}
      {step === 3 && <GenericForm {...{ ...props, fields: PartnerFormFields.ShippingPartnerInformationFormFields }} />}
      <div className="flex justify-center gap-x-2 mt-4">
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="bg-secondary px-10 py-2 text-white rounded-lg my-2 hover:bg-opacity-90"
          >
            Back
          </button>
        )}
        {step < 3 && (
          <button
            type="button"
            onClick={handleNext}
            className="bg-primary px-10 py-2 text-white rounded-lg my-2 hover:bg-opacity-90"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionForm;
