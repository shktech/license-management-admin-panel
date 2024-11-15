"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { Permission, Reference } from "@/types/types";
import GenericForm from "@components/Forms/GenericForm";
import { ReferenceFormFields } from "@components/Forms/References/ReferenceFormFields";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import { useBack, useParsed, usePermissions } from "@refinedev/core";
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
  } = useForm<Reference>({
    mode: "onChange",
    reValidateMode: "onSubmit",
    refineCoreProps: {
      action: "edit",
      resource: "references",
      id: params?.id,
    },
  });

  const { data: permissionsData, isLoading: isPermissionsLoading } = usePermissions<Permission>({
    params: { codename: "reference" },
  });

  const reference: Reference = queryResult?.data?.data as Reference;

  useEffect(() => {
    if (!formLoading && reference) {
      reset({ ...reference });
    }
  }, [formLoading, reference]);

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
              Edit Reference
              <div className="text-sm text-[#818f99]">
                {reference?.reference_name}
              </div>
            </div>
          }
          breadcrumb={false}
          headerButtons={<></>}
          wrapperProps={{
            className: "rounded-none bg-[#f2f6fa] shadow-none",
          }}
          saveButtonProps={{ ...saveButtonProps, hidden: !permissionsData?.update }}
          footerButtons={({ saveButtonProps }) => (
            <SaveButton {...saveButtonProps} sx={sendEmailBtnStyle} />
          )}
        >
          {formLoading || isPermissionsLoading ? (
            <Loader />
          ) : (
            <GenericForm
              {...{ control, errors, trigger }}
              fields={ReferenceFormFields.edit}
            />
          )}
        </Edit>
      </div>
    </div>
  );
};

export default Item;
