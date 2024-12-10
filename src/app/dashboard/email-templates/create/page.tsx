"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { EmailTemplate } from "@/types/types";
import EmailTemplateComponent from "@components/Forms/EmailTemplates/EmailTemplate";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import { useBack } from "@refinedev/core";
import { Create, SaveButton } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect, useState } from "react";

const Item = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading, queryResult },
    control,
    trigger,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EmailTemplate>({
    mode: "onChange",
    reValidateMode: "onSubmit"
  });

  const [emailBody, setEmailBody] = useState<string>("<body></body>");

  useEffect(() => {
    setValue("body", emailBody);
  }, [emailBody, setValue]);

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
              Create Notification Template
            </div>
          }
          saveButtonProps={{ ...saveButtonProps, hidden: false }}
          footerButtons={({ saveButtonProps }) => (
            <SaveButton {...saveButtonProps} sx={sendEmailBtnStyle} />
          )}
          wrapperProps={{
            className: "rounded-none bg-[#f2f6fa] shadow-none",
          }}
        >
          {formLoading ? (
            <Loader />
          ) : (
            <EmailTemplateComponent
              template={null}
              errors={errors}
              control={control}
              watch={watch}
              reset={reset}
              setEmailBody={setEmailBody}
            />
          )}
        </Create>
      </div>
    </div>
  );
};

export default Item;
