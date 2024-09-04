"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { Reference, ReferenceCode } from "@/types/types";
import GenericForm from "@components/Forms/GenericForm";
import ProductForm from "@components/Forms/Products/ProductForm";
import ReferenceCodeFormFields from "@components/Forms/References/ReferenceCodeFormFields";
import ReferenceFormFields from "@components/Forms/References/ReferenceFormFields";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import { useBack, useParsed } from "@refinedev/core";
import { Create, Edit, SaveButton } from "@refinedev/mui";
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
  } = useForm<ReferenceCode>({
    refineCoreProps: {
      action: "edit",
      resource: `references/${params?.reference_id}/codes`,
      id: params?.code_id,
    },
  });

  const referenceCode: ReferenceCode = queryResult?.data?.data as ReferenceCode;

  useEffect(() => {
    if (!formLoading && referenceCode) {
      reset({ ...referenceCode, osc_part_number: referenceCode.osc_product?.product_part_number });
    }
  }, [formLoading, referenceCode]);

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
          title={
            <div className="!font-satoshi text-2xl font-semibold text-[#1f325c]">
              Edit Reference Code
              <div className="text-sm text-[#778599]">
                {referenceCode?.reference?.reference_name}
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
              fields={ReferenceCodeFormFields}
            />
          )}
        </Edit>
      </div>
    </div>
  );
};

export default Item;
