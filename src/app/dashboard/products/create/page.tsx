"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { Permission, Product } from "@/types/types";
import ProductForm from "@components/Forms/Products/ProductForm";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import { useBack, useParsed, usePermissions } from "@refinedev/core";
import { Create, SaveButton } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

const Item = () => {
  const { params } = useParsed();
  const {
    saveButtonProps,
    refineCore: { formLoading, queryResult },
    control,
    trigger,
    formState: { errors },
    watch,
  } = useForm<Product>({
    mode: "onChange",
    reValidateMode: "onSubmit",
    refineCoreProps: {
      action: "create",
      resource: "products",
      id: params?.id,
    },
  });

  const { data: permissionsData, isLoading: isPermissionsLoading } = usePermissions<Permission>({
    params: { codename: "product" },
  });

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
          breadcrumb={false}
          headerButtons={<></>}
          title={
            <div className="!font-satoshi text-2xl font-semibold text-[#1f325c] flex items-center">
              Create Product
            </div>
          }
          saveButtonProps={{ ...saveButtonProps, hidden: !permissionsData?.create }}
          footerButtons={({ saveButtonProps }) => (
            <SaveButton {...saveButtonProps} sx={sendEmailBtnStyle} />
          )}
          wrapperProps={{
            className: "rounded-none bg-[#f2f6fa] shadow-none",
          }}
        >
          {formLoading || isPermissionsLoading ? (
            <Loader />
          ) : (
            <ProductForm {...{ control, errors, trigger, watch }} />
          )}
        </Create>
      </div>
    </div>
  );
};

export default Item;
