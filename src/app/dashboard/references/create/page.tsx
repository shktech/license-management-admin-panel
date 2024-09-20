"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { Reference } from "@/types/types";
import GenericForm from "@components/Forms/GenericForm";
import { ReferenceFormFields } from "@components/Forms/References/ReferenceFormFields";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import { useBack } from "@refinedev/core";
import { Create, SaveButton } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect } from "react";

const Item = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading, queryResult },
    control,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Reference>({
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const reference: Reference = queryResult?.data?.data as Reference;

  useEffect(() => {
    if (!formLoading && reference) {
      reset({ ...reference });
    }
  }, [formLoading, reference]);

  useEffect(() => {
    const nowDate = new Date();
    const nowDateString = nowDate.toISOString().split("T")[0];
    const tomorrow = new Date(nowDate.setDate(nowDate.getDate() + 1));
    const tomorrowString = tomorrow.toISOString().split("T")[0];
    const initialInfo = {
      start_date: nowDateString,
      end_date: tomorrowString,
    };
    reset({ ...initialInfo });
  }, []);

  return (
    <div className="flex justify-center py-6">
      <div className="w-2/3">
        <Create
          goBack={
            <button
              onClick={useBack()}
              className="inline-block p-2 rounded-xl border duration-500 border-transparent hover:border-black"
            >
              {" "}
              <ArrowIcon />
            </button>
          }
          title={
            <div className="!font-satoshi text-2xl font-semibold text-[#1f325c]">
              Create Reference
            </div>
          }
          breadcrumb={false}
          headerButtons={<></>}
          wrapperProps={{
            className: "rounded-none bg-[#f2f6fa] shadow-none",
          }}
          saveButtonProps={{ ...saveButtonProps, hidden: false }}
          footerButtons={({ saveButtonProps }) => (
            <SaveButton {...saveButtonProps} sx={sendEmailBtnStyle} />
          )}
        >
          {formLoading ? (
            <Loader />
          ) : (
            <GenericForm
              {...{ control, errors, trigger }}
              fields={ReferenceFormFields.create}
            />
          )}
        </Create>
      </div>
    </div>
  );
};

export default Item;
