import React, { useEffect, useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { EmailTemplate } from "@/types/types";
import GeneralInput from "@components/Input/GeneralInput";
import { Button, FormControl } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NoteIcon from "@/assets/icons/note.svg?icon";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { modalOkBtnStyle, sendEmailBtnStyle } from "@data/MuiStyles";
import FormControlWrapper from "../FormControlWrapper";
import { useCreate, useUpdate } from "@refinedev/core";

interface EmailTemplateComponentProps {
  template: EmailTemplate;
  expanded: string | false;
  handleChangeAccordian: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  onSave: () => void;
}

const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  lineNumbers: "off",
};

const handleEditorDidMount = (editor: any, monaco: any) => {
  monaco.editor.defineTheme("custom-theme", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: { "editor.background": "#e6eaed" },
  });
  monaco.editor.setTheme("custom-theme");
};

const EmailTemplateComponent: React.FC<EmailTemplateComponentProps> = ({
  template,
  expanded,
  handleChangeAccordian,
  onSave,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EmailTemplate>();

  useEffect(() => {
    reset({ ...template });
  }, [template]);

  const [testRecipient, setTestRecipient] = useState<string>("");
  const [emailBody, setEmailBody] = useState<string>(template.body as string);

  const { mutate } = useUpdate();
  const { mutate: sendTestEmail} = useCreate();

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      body: emailBody,
    };
    console.log(payload);
    mutate(
      {
        resource: "email-templates/type",
        id: `${template.type as string}/`,
        values: payload,
      },
      {
        onError: (error) => {},
        onSuccess: () => {
          onSave();
        },
      }
    );
  };

  const sendEmail = () => {
    const payload = {
        recipient_email: testRecipient
    }
    sendTestEmail({
      resource: `email-templates/type/${template.type as string}/test/`,
      values: payload,
    });
  }

  const onEmailBodyChange = (value: string) => {
    setEmailBody(value);
  }

  return (
    <Accordion
      elevation={0}
      disableGutters
      expanded={expanded == template.email_id}
      onChange={handleChangeAccordian(template.email_id as string)}
      sx={{
        border: "1px solid #d7dde4",
        borderBottom: "1",
        "&::before": { display: "none" },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id={template.email_id}
        sx={{
          py: 1,
          "&:hover": {
            backgroundColor: "#e6eaed", // Light grey background on hover
          },
        }}
      >
        <span className="pl-2">
          <NoteIcon />
        </span>
        <div className="pl-2 text-black">{template.type}</div>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 w-full py-2 px-2">
            <FormControlWrapper
              name="from_email"
              control={control}
              rules={{ required: "Sender address is required" }}
              error={errors.from_email?.message?.toString()}
            >
              {(field) => (
                <GeneralInput
                  {...field}
                  id="senderAddress"
                  label="Sender Address"
                  type="text"
                  defaultValue={template.from_email}
                />
              )}
            </FormControlWrapper>
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
                  defaultValue={template.subject}
                />
              )}
            </FormControlWrapper>
            <div className="pl-2 mt-1 text-[0.75rem]">
              Available placeholder parameters:{" "}
              <span className="text-[0.6rem] bg-[#d5dce3] rounded-full py-0.5 px-2">{`{ APP_NAME }`}</span>
              ,{" "}
              <span className="text-[0.6rem] bg-[#d5dce3] rounded-full py-0.5 px-2">{`{ APP_URL }`}</span>
            </div>
            <FormControlWrapper name="cc" control={control}>
              {(field) => (
                <GeneralInput
                  {...field}
                  id="cc"
                  label="CC"
                  type="text"
                  defaultValue={template.cc}
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
                  defaultValue={template.bcc}
                />
              )}
            </FormControlWrapper>
            <div className="pl-2 mt-1 text-[0.75rem]">
              Available placeholder parameters:{" "}
              <span className="text-[0.6rem] bg-[#d5dce3] rounded-full py-0.5 px-2">{`{ APP_NAME }`}</span>
              ,{" "}
              <span className="text-[0.6rem] bg-[#d5dce3] rounded-full py-0.5 px-2">{`{ APP_URL }`}</span>
            </div>
            <div className="">
              <div className="bg-[#e6eaed] rounded-t-lg border-r-ful font-medium text-sm p-4 text-[#0000009c]">
                Body(HTML)
              </div>
              <Editor
                defaultValue={template.body}
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
            <div className="flex justify-end gap-2">
              <Button type="submit" variant="contained" sx={modalOkBtnStyle}>
                Save
              </Button>
            </div>
            <div className="flex justify-start flex-row w-full gap-2">
              <GeneralInput onChange={(e) => setTestRecipient(e.target.value)} type={"text"} label="Test recipient"></GeneralInput>
              <Button onClick={sendEmail} variant="contained" sx={sendEmailBtnStyle}>
                Send test email
              </Button>
            </div>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default EmailTemplateComponent;
