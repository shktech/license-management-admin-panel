"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { Lookup } from "@/types/types";
import GenericForm from "@components/Forms/GenericForm";
import { LookupFormFields } from "@components/Forms/Lookups/LookupFormFields";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import { useBack, useParsed } from "@refinedev/core";
import { Edit, SaveButton } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect } from "react";

const Item = () => {
  const { params } = useParsed();
  const {
    saveButtonProps,
    refineCore: { formLoading, queryResult },
    control,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Lookup>({
    mode: "onChange",
    reValidateMode: "onSubmit",
    refineCoreProps: {
      action: "edit",
      resource: "lookups",
      id: params?.id,
    },
  });

  const lookup: Lookup = queryResult?.data?.data as Lookup;

  useEffect(() => {
    if (!formLoading && lookup) {
      reset({ ...lookup });
    }
  }, [formLoading, lookup]);

  return (
    <div className="flex justify-center py-6">
      <div className="w-2/3">
        <Edit
          goBack={
            <button
              onClick={useBack()}
              className="inline-block p-2 rounded-xl border duration-500 border-transparent hover:border-black"
            >
              {" "}
              <ArrowIcon />
            </button>
          }
          canDelete={false}
          title={
            <div className="!font-satoshi text-2xl font-semibold text-[#1f325c]">
              Edit Lookup
              <div className="text-sm text-[#818f99]">
                {lookup?.lookup_name}
              </div>
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
              fields={LookupFormFields.edit}
            />
          )}
        </Edit>
      </div>
    </div>
  );
};

export default Item;
