"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { EmailTemplate, Permission } from "@/types/types";
import EmailTemplateComponent from "@components/Forms/EmailTemplates/EmailTemplate";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import { useBack, useParsed, usePermissions, useUpdate } from "@refinedev/core";
import { Edit, SaveButton } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect, useState } from "react";

const Item = () => {
  const { params } = useParsed();
  const {
    saveButtonProps,
    refineCore: { formLoading, queryResult },
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<EmailTemplate>({
    mode: "onChange",
    reValidateMode: "onSubmit",
    refineCoreProps: {
      action: "edit",
      resource: "email-templates",
      id: params?.id,
    },
  });

  const { data: permissionsData, isLoading: isPermissionsLoading } = usePermissions<Permission>({
    params: { codename: "emailtemplate" },
  });

  const emailTemplate: EmailTemplate = queryResult?.data?.data as EmailTemplate;
  const [emailBody, setEmailBody] = useState<string>(
    emailTemplate?.body as string
  );

  useEffect(() => {
    if (!formLoading && emailTemplate) {
      const { ...templateWithoutMeta } = emailTemplate;
      reset({ ...templateWithoutMeta });
    }
  }, [formLoading, emailTemplate]);

  useEffect(() => {
    reset({ ...emailTemplate, body: emailBody });
  }, [emailBody]);

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
          breadcrumb={false}
          headerButtons={<></>}
          title={
            <div className="!font-satoshi text-2xl font-semibold text-[#1f325c] flex items-center">
              Edit notification template
            </div>
          }
          saveButtonProps={{ ...saveButtonProps, hidden: !permissionsData?.update }}
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
            <EmailTemplateComponent
              template={emailTemplate}
              errors={errors}
              control={control}
              watch={watch}
              reset={reset}
              setEmailBody={setEmailBody}
            />
          )}
        </Edit>
      </div>
    </div>
  );
};

export default Item;
