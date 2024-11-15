"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { Permission, Product } from "@/types/types";
import ProductForm from "@components/Forms/Products/ProductForm";
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
    watch,
    formState: { errors },
  } = useForm<Product>({
    mode: "onChange",
    reValidateMode: "onSubmit",
    refineCoreProps: {
      action: "edit",
      resource: "products",
      id: params?.id,
    },
  });

  const { data: permissionsData, isLoading: isPermissionsLoading } = usePermissions<Permission>({
    params: { codename: "product" },
  });

  const product: Product = queryResult?.data?.data as Product;

  useEffect(() => {
    if (!formLoading && product) {
      reset({ email_id: product?.email_template?.email_id, ...product });
    }
  }, [formLoading, product]);

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
              Edit Product
              <div className="text-sm text-[#818f99]">
                {product?.product_name}
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
            <ProductForm {...{ control, errors, trigger, watch }} product={product} />
          )}
        </Edit>
      </div>
    </div>
  );
};

export default Item;
