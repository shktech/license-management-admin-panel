"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { Product, ReferenceCode } from "@/types/types";
import GenericForm from "@components/Forms/GenericForm";
import ReferenceCodeFormFields from "@components/Forms/References/ReferenceCodeFormFields";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import { useBack, useList, useParsed } from "@refinedev/core";
import { Create, SaveButton } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { getDurationFromString } from "@utils/utilFunctions";
import { useEffect } from "react";

const Item = () => {
  const { params } = useParsed();
  const {
    saveButtonProps,
    refineCore: { formLoading, queryResult },
    control,
    reset,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReferenceCode>({
    refineCoreProps: {
      action: "create",
      resource: `references/${params?.id}/codes`,
    },
  });

  const { data: productData, isLoading: productLoading } = useList<Product>({
    resource: "products",
    hasPagination: false,
  });

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

  const start_date = watch("start_date");
  const osc_part_number = watch("osc_part_number");

  useEffect(() => {
    let duration;
    if (productData?.data) {
      duration = productData.data.find(
        (p) => p.product_part_number == osc_part_number
      )?.duration;
    }
    if (start_date) {
      const originalDate = new Date(start_date);
      originalDate.setFullYear(
        originalDate.getFullYear() + getDurationFromString(duration as string)
      );
      const end_date = originalDate.toISOString().split("T")[0];
      setValue("end_date", end_date);
    }
  }, [start_date, osc_part_number]);

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
        </Create>
      </div>
    </div>
  );
};

export default Item;
