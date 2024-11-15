"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { Permission, Product, ReferenceCode } from "@/types/types";
import GenericForm from "@components/Forms/GenericForm";
import { ReferenceCodeFormFields } from "@components/Forms/References/ReferenceCodeFormFields";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import { useBack, useCreate, useList, useNavigation, useParsed, usePermissions } from "@refinedev/core";
import { Create, SaveButton } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect } from "react";

const Item = () => {
  const { params } = useParsed();
  const { push } = useNavigation();
  const {
    saveButtonProps,
    refineCore: { formLoading, queryResult },
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<ReferenceCode>({
    mode: "onChange",
    reValidateMode: "onSubmit",
    refineCoreProps: {
      action: "create",
      resource: `references/${params?.id}/codes`,
    },
  });

  const { data: permissionsData, isLoading: isPermissionsLoading } = usePermissions<Permission>({
    params: { codename: "reference" },
  });

  const { mutate: createCode } = useCreate();
  const handleSubmit = async () => {
    const isValid = await trigger(); // Triggers validation for all fields
    if (isValid) {
      const payload = getValues();
      createCode(
        {
          resource: `references/${params?.id}/codes`,
          values: payload,
        },
        {
          onError: (error) => console.log("error", error),
          onSuccess: () => push(`/dashboard/references/show?id=${params?.id}`),
        }
      );
    }
  };
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
              Create Reference Code
              <div className="text-sm text-[#778599]">
                {params?.reference_name}
              </div>
            </div>
          }
          breadcrumb={false}
          headerButtons={<></>}
          wrapperProps={{
            className: "rounded-none bg-[#f2f6fa] shadow-none",
          }}
          saveButtonProps={{ ...saveButtonProps, hidden: !permissionsData?.create }}
          footerButtons={({ saveButtonProps }) => (
            <SaveButton onClick={handleSubmit} sx={sendEmailBtnStyle} />
          )}
        >
          {formLoading || isPermissionsLoading ? (
            <Loader />
          ) : (
            <GenericForm
              {...{ control, errors, trigger }}
              fields={ReferenceCodeFormFields.create}
            />
          )}
        </Create>
      </div>
    </div>
  );
};

export default Item;
