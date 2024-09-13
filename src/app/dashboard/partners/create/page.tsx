"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { Partner } from "@/types/types";
import GenericForm from "@components/Forms/GenericForm";
import { PartnerFormFields } from "@components/Forms/Partners/PartnerFormFields";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import { useBack } from "@refinedev/core";
import { Create, SaveButton } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

const Item = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading, queryResult },
    control,
    reset,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<Partner>();

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
              Create Partner
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
              {...{ control, errors, trigger, setValue }}
              fields={PartnerFormFields.create}
            />
          )}
        </Create>
      </div>
    </div>
  );
};

export default Item;
