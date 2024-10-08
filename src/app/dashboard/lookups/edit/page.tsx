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
import { getDisabledFields } from "@utils/utilFunctions";
import ErrorIcon from '@mui/icons-material/Error';

const Item = () => {
  const { params } = useParsed();
  const {
    saveButtonProps,
    refineCore: { formLoading, queryResult },
    control,
    reset,
    trigger,
    getValues,
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

  const lookupData = queryResult?.data?.data as Lookup;

  useEffect(() => {
    if (!formLoading && lookupData) {
      const lookup = {
        ...lookupData,
        parent_lookup: lookupData?.parent_lookup?.lookup_id as string,
      };
      reset({ ...lookup });
    }
  }, [formLoading, lookupData]);

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
            <div
              className="!font-satoshi text-2xl font-semibold text-[#1f325c]"
              onClick={() => console.log(getValues())}
            >
              Edit Lookup:{" "}
              <span className="text-lg">{lookupData?.lookup_name}</span>
            </div>
          }
          breadcrumb={false}
          headerButtons={<div></div>}
          wrapperProps={{
            className: "rounded-none bg-[#f2f6fa] shadow-none",
          }}
          saveButtonProps={{ ...saveButtonProps, hidden: false }}
          footerButtons={({ saveButtonProps }) =>
            !lookupData?.is_default && (
              <SaveButton {...saveButtonProps} sx={sendEmailBtnStyle} />
            )
          }
        >
          {formLoading ? (
            <Loader />
          ) : (
            <>
              {lookupData?.is_default && (
                <div className="px-4 py-4 mb-4 bg-[#fdedef] text-black flex gap-2 items-center">
                  <span className="text-[#ef4d61] pb-0.5"><ErrorIcon /></span>
                  Editing a default lookup is not allowed
                </div>
              )}
              <GenericForm
                {...{ control, errors, trigger }}
                fields={
                  lookupData?.is_default
                    ? getDisabledFields(LookupFormFields.edit)
                    : LookupFormFields.edit
                }
              />
            </>
          )}
        </Edit>
      </div>
    </div>
  );
};

export default Item;
