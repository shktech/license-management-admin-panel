import React, { useEffect, useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { Email_Schedule, EmailTemplate } from "@/types/types";
import GeneralInput from "@components/Input/GeneralInput";
import DatePicker from "@components/Input/DatePicker";
import Dropdown from "@components/Input/Dropdown";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NoteIcon from "@/assets/icons/note.svg?icon";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import FormControlWrapper from "../FormControlWrapper";
import { useBack, useCreate, useUpdate } from "@refinedev/core";
import { timeZones } from "@utils/timeZones";
import { Button } from "@mui/material";
import { modalOkBtnStyle } from "@data/MuiStyles";
import GeneralSwitch from "@components/Input/GeneralSwitch";

interface NotificationSchedulesComponentProps {
  template?: Email_Schedule;

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

const NotificationSchedulesComponent: React.FC<NotificationSchedulesComponentProps> = ({
  template,
  onSave
}) => {
  const {
    handleSubmit,
    control,
    reset,
    
    formState: { errors },
  } = useForm<Email_Schedule>();

  useEffect(() => {
    reset({ ...template });
  }, [template]);

  const [testRecipient, setTestRecipient] = useState<string>("");
  const [emailBody, setEmailBody] = useState<string>(template?.body as string);
  const [revoke, setRevoke] = React.useState(template?.is_active);
  const { mutate } = useCreate();
  const { mutate: update } = useUpdate();

  const onSubmit = (data: any) => {
    const payload = {
        ...data,
        body: emailBody,
        is_active:revoke
      };
    
    if(template)
    {
        payload.is_active = revoke;
        update(
            {
              resource: "notification-schedules",
              id: `${template.id as string}`,
              values: payload,
            },
            {
              onError: () => { },
              onSuccess: () => {
                onSave();
              },
            }
          );
    }else{
        payload.is_recurring = true;
        payload.is_active = true;
          mutate(
            {
              resource: "notification-schedules",
              values: payload,
            },
            {
              onError: (error) => { },
              onSuccess: () => {
                  onSave();
              },
            }
          );
    }
   
  };

const options = [
    {
    value:"daily",
    label:"Daily"
},
    {
    value:"weekly",
    label:"Weekly"
},
    {
    value:"yearly",
    label:"Yearly"
}
]

  const onEmailBodyChange = (value: string) => {
    setEmailBody(value);
  }

  return (
 <>
    
 
   
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 w-full py-2 px-2">
            <FormControlWrapper
              name="email"
              control={control}
              rules={{ required: "Email address is required" }}
              error={errors.email?.message?.toString()}
            >
              {(field) => (
                <GeneralInput
                  {...field}
                  required={true}
                  id="email"
                  label="Email Address"
                  type="text"
                  defaultValue={template?.email}
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
                  required={true}
                  type="text"
                  defaultValue={template?.subject}
                />
              )}
            </FormControlWrapper>
      <div className="md:flex block items-center  justify-between">

<FormControlWrapper
              name="scheduled_time"
              control={control}
              rules={{ required: "Time is required" }}
              error={errors.scheduled_time?.message?.toString()}
            >
              {(field) => (
                <DatePicker
                  {...field}
                  id="scheduled_time"
                  label="Select Time"
                  required={true}
                  type='time'
                 
                  defaultValue={template?.subject}
                />
              )}
            </FormControlWrapper>
        
            <div className="md:ms-6 w-full">
      <FormControlWrapper
              name="recurring_task"
              control={control}
              rules={{ required: "Select an option" }}
              error={errors.recurring_task?.message?.toString()}
            >
              {(field) => (
                <Dropdown
                  {...field}
                  id="recurring_task"
                  label="Select Recurring Option"
                  required={true}
                  type="dropdown"
                  options={options}
                  defaultValue={template?.subject}
                />
              )}
            </FormControlWrapper>
        </div>
      </div>
      {
        template && template?.id ?
        null:
        <FormControlWrapper
        name="user_timezone"
        control={control}
        rules={{ required: "Select an option" }}
        error={errors.user_timezone?.message?.toString()}
      >
        {(field) => (
          <Dropdown
            {...field}
            id="user_timezone"
            label="Select timezone"
            required={true}
            type="dropdown"
            options={timeZones}
            defaultValue={template?.subject}
          />
        )}
      </FormControlWrapper> 
      }
     
            <div className="">
              <div className="bg-[#e6eaed] rounded-t-lg border-r-ful font-medium text-sm p-4 text-[#0000009c]">
               Email Template(HTML)
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
            
            <div className="flex justify-end gap-2 mt-5">
            {
        template && template?.id ?
        <FormControlWrapper
        name="is_active"
        control={control}
       
        error={errors.subject?.message?.toString()}
      >
        {(field) => (
          <GeneralSwitch
            {...field}
            id="is_active"
            label="Is Active"
          
            onChange={() => setRevoke(!revoke)}
            value={revoke}
           
        
          />
        )}
      </FormControlWrapper> :null
       
      }</div>
            <div className="flex justify-end gap-2 mt-5">
              <Button type="submit" variant="contained" sx={modalOkBtnStyle}>
                Save
              </Button>
            </div>
      </div>
          </div>
        </form>
        </>
  );
};

export default NotificationSchedulesComponent;
