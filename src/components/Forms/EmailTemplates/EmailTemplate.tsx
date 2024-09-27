import React, { useEffect } from "react";
import { EmailTemplate } from "@/types/types";
import GeneralInput from "@components/Input/GeneralInput";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import FormControlWrapper from "../FormControlWrapper";
import Dropdown from "@components/Input/Dropdown";

interface EmailTemplateComponentProps {
  template: EmailTemplate | null;
  control: any;
  errors: any;
  watch: any;
  reset: any;
  setEmailBody: any;
}

const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  lineNumbers: "off",
};

const handleEditorDidMount = (editor: any, monaco: any) => {
  monaco.editor.defineTheme("custom-theme", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: { "editor.background": "#dfe6ec" },
  });
  monaco.editor.setTheme("custom-theme");
};

const EmailTemplateComponent: React.FC<EmailTemplateComponentProps> = ({
  template,
  control,
  errors,
  watch,
  reset,
  setEmailBody,
}) => {
  const onEmailBodyChange = (value: string) => {
    setEmailBody(value);
  };

  const type = watch("type");
  const [requireEventType, setRequireEventType] = React.useState<boolean>(
    template?.type === "event"
  );
  useEffect(() => {
    setRequireEventType(type === "event");
    if (type === "scheduled") {
      reset((prevValues: any) => ({
        ...prevValues,
        type,
        event_type: template?.event_type || "",
      }));
    }
  }, [type, reset, template]);

  return (
    <Accordion
      elevation={0}
      disableGutters
      expanded={true}
      sx={{
        // border: "1px solid #d7dde4",
        borderBottom: "1",
        pt: "6px",
        "&::before": { display: "none" },
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);",
      }}
    >
      <AccordionDetails>
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <div className="flex flex-col gap-4 w-full py-2 px-2">
          <FormControlWrapper
            name="subject"
            control={control}
            rules={{ required: "Subject is required" }}
            error={errors.subject?.message?.toString()}
          >
            {(field) => (
              <GeneralInput
                {...field}
                id="subject"
                label="Subject"
                type="text"
                required={true}
                defaultValue={template?.subject}
              />
            )}
          </FormControlWrapper>
          <FormControlWrapper
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            error={errors.description?.message?.toString()}
          >
            {(field) => (
              <GeneralInput
                {...field}
                id="description"
                label="Description"
                type="text"
                required={true}
                defaultValue={template?.description}
              />
            )}
          </FormControlWrapper>
          <FormControlWrapper name="cc" control={control}>
            {(field) => (
              <GeneralInput
                {...field}
                id="cc"
                label="CC"
                type="text"
                defaultValue={template?.cc}
              />
            )}
          </FormControlWrapper>
          <FormControlWrapper name="bcc" control={control}>
            {(field) => (
              <GeneralInput
                {...field}
                id="bcc"
                label="BCC"
                type="text"
                defaultValue={template?.bcc}
              />
            )}
          </FormControlWrapper>
          <div className="grid grid-cols-2 gap-4 w-full">
            <FormControlWrapper
              name="type"
              control={control}
              rules={{ required: "Type is required" }}
              error={errors.type?.message?.toString()}
            >
              {(field) => (
                <Dropdown
                  {...field}
                  id="type"
                  label="Type"
                  type="dropdown"
                  required={true}
                  defaultValue={template?.type}
                  options={[
                    { value: "event", label: "Event" },
                    { value: "scheduled", label: "Scheduled" },
                  ]}
                />
              )}
            </FormControlWrapper>
            <FormControlWrapper
              name="event_type"
              control={control}
              rules={requireEventType && { required: "Event type is required" }}
              error={requireEventType && errors.event_type?.message?.toString()}
            >
              {(field) => (
                <Dropdown
                  {...field}
                  id="event_type"
                  label="Event Type"
                  type="dropdown"
                  defaultValue={template?.event_type}
                  disabled={!requireEventType}
                  required={requireEventType}
                  options={[
                    { value: "user_invited", label: "User Invited" },
                    { value: "license_created", label: "License Created" },
                    { value: "license_revoked", label: "License Revoked" },
                    { value: "license_renewed", label: "License Renewed" },
                  ]}
                />
              )}
            </FormControlWrapper>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <FormControlWrapper
              name="product_type"
              control={control}
              rules={{ required: "Type is required" }}
              error={errors.type?.message?.toString()}
            >
              {(field) => (
                <Dropdown
                  {...field}
                  id="product_type"
                  label="Product Type"
                  type="dropdown"
                  defaultValue={template?.product_type}
                  resource="lookups/PRODUCT_TYPE/values"
                  valueKey="value"
                  labelKey="value"
                />
              )}
            </FormControlWrapper>
            <FormControlWrapper name="product_family" control={control}>
              {(field) => (
                <GeneralInput
                  {...field}
                  id="product_family"
                  label="Product Family"
                  type="text"
                  defaultValue={template?.product_family}
                />
              )}
            </FormControlWrapper>
          </div>
          <div className="">
            <div className="bg-[#dfe6ec] rounded-t-lg border-r-ful font-medium text-sm p-4 text-[#0000009c]">
              Body(HTML)
            </div>
            <Editor
              defaultValue={template?.body}
              height="300px"
              defaultLanguage="html"
              options={editorOptions}
              theme="custom-theme"
              onMount={handleEditorDidMount}
              onChange={(value) => onEmailBodyChange(value as string)}
            />
            <div className="pl-2 mt-1 text-[0.75rem]">
              Available placeholder parameters:{" "}
              <span className="text-[0.6rem] bg-[#d5dce3] rounded-full py-0.5 px-2">{`{ APP_NAME }`}</span>
              ,{" "}
              <span className="text-[0.6rem] bg-[#d5dce3] rounded-full py-0.5 px-2">{`{ APP_URL }`}</span>
            </div>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default EmailTemplateComponent;
