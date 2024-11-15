"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { Lookup, Permission } from "@/types/types";
import GenericForm from "@components/Forms/GenericForm";
import { ReportFormFields } from "@components/Forms/Reports/ReportFormFields";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import { useBack, usePermissions, useCreate, useNavigation } from "@refinedev/core";
import { Create, SaveButton } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

const Item = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading, queryResult },
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onSubmit"
  });
  const { push } = useNavigation();
  const { mutate } = useCreate();

  const onSubmit = async () => {
    const valid = await trigger();
    if (valid) {
      const formValues = getValues();
      const payload = {
        start_date: formValues.start_date,
        end_date: formValues.end_date,
        partner_id: formValues.owner
      }
      mutate(
        {
          resource: "reports",
          values: payload,
        },
        {
          onError: (error) => {},
          onSuccess: () => {
            push("/dashboard/reports/list");
          },
        }
      );
    }
  }

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
              Create Reports
            </div>
          }
          breadcrumb={false}
          headerButtons={<></>}
          wrapperProps={{
            className: "rounded-none bg-[#f2f6fa] shadow-none",
          }}
          saveButtonProps={{ ...saveButtonProps, hidden: false }}
          footerButtons={({ saveButtonProps }) => (
            <SaveButton {...saveButtonProps} sx={sendEmailBtnStyle} onClick={onSubmit} />
          )}
        >
          {formLoading ? (
            <Loader />
          ) : (
            <div>
              <GenericForm
                {...{ control, errors, trigger }}
                fields={ReportFormFields.create}
              />
            </div>
          )}
        </Create>
      </div>
    </div>
  );
};

export default Item;