"use client";
import { useList, useOne, useTable } from "@refinedev/core";
import { EmailTemplate } from "@/types/types";
import React, { useEffect, useMemo, useState } from "react";
import Loader from "@components/common/Loader";
import { useForm } from "react-hook-form";
import GeneralInput from "@components/Input/GeneralInput";
import { Button, Collapse, FormControl, FormControlLabel, FormGroup, FormHelperText, Switch } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NoteIcon from "@/assets/icons/note.svg?icon";
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

const Page = () => {
  const { data, isLoading } = useOne({
    resource: 'email-templates', id: 'all'
  })

  const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    lineNumbers: 'off' // This hides the line numbers
  };

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChangeAccordian =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };


  const handleEditorDidMount = (editor: any, monaco: any) => {
    monaco.editor.defineTheme('custom-theme', {
      base: 'vs', // or 'vs-dark'
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#e6eaed' // Set your desired background color here
      }
    });
    monaco.editor.setTheme('custom-theme');
  };

  return (
    <div className="flex w-full justify-center text-black text-sm">
      <div className="min-w-[800px] rounded-xl px-8 py-8 drop-shadow-md bg-white">
        <div className="text-base">Configure common settings for sending emails.</div>
        <div className="flex gap-4 w-full py-8">
          <FormControl className="w-full">
            <GeneralInput
              id="senderName"
              name="senderName"
              label="Sender Name"
              type="text"
              defaultValue={data?.data.sender.name}
              disabled={false}
            />
          </FormControl>
          <FormControl className="w-full">
            <GeneralInput
              id="senderAddress"
              name="senderAddress"
              label="Sender Address"
              type="text"
              defaultValue={data?.data.sender.address}
              disabled={false}
            />
          </FormControl>
        </div>
        <div>
          {
            data?.data?.emailTemplates.map((et: any, i: number) => {
              return (
                <Accordion
                  elevation={0}
                  // disableGutters
                  expanded={expanded == et.id}
                  onChange={handleChangeAccordian(et.id)}
                  sx={{
                    border: '1px solid #d7dde4',
                    '&::before': {
                      display: 'none',
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id={et.id}
                    sx={{
                      py: 1,
                      "&:hover": {
                        backgroundColor: "#e6eaed", // Light grey background on hover
                      },
                    }}
                  >
                    <span className="pl-2"><NoteIcon /></span>
                    <div className="pl-2 text-black">{et.title}</div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="flex flex-col gap-4 w-full py-2">
                      <FormControl className="w-full">
                        <GeneralInput
                          id={'subject' + i}
                          name={'subject' + i}
                          label="Subject"
                          type="text"
                          defaultValue={et.subject}
                          disabled={false}
                        />
                        <div className="pl-2 mt-1 text-[0.75rem]">
                          Available placeholder parameters: <span className="text-[0.6rem] bg-[#d5dce3] rounded-full py-0.5 px-2">{`{ APP_NAME }`}</span>, <span className="text-[0.6rem] bg-[#d5dce3] rounded-full py-0.5 px-2">{`{ APP_URL }`}</span>
                        </div>
                      </FormControl>

                      <FormControl className="w-full">
                        <GeneralInput
                          id={'cc' + i}
                          name={'cc' + i}
                          label="cc"
                          type="text"
                          defaultValue={et.cc}
                          disabled={false}
                        />
                        <div className="pl-2 mt-1 text-[0.75rem]">
                          Available placeholder parameters: <span className="text-[0.6rem] bg-[#d5dce3] rounded-full py-0.5 px-2">{`{ APP_NAME }`}</span>, <span className="text-[0.6rem] bg-[#d5dce3] rounded-full py-0.5 px-2">{`{ APP_URL }`}</span>
                        </div>
                      </FormControl>
                      <FormControl className="w-full">
                        <GeneralInput
                          id={'bcc' + i}
                          name={'bcc' + i}
                          label="bcc"
                          type="text"
                          defaultValue={et.bcc}
                          disabled={false}
                        />
                        <div className="pl-2 mt-1 text-[0.75rem]">
                          Available placeholder parameters: <span className="text-[0.6rem] bg-[#d5dce3] rounded-full py-0.5 px-2">{`{ APP_NAME }`}</span>, <span className="text-[0.6rem] bg-[#d5dce3] rounded-full py-0.5 px-2">{`{ APP_URL }`}</span>
                        </div>
                      </FormControl>
                      <div className="">
                        <div className="bg-[#e6eaed] rounded-t-lg border-r-ful font-medium text-sm p-4 text-[#0000009c]">Body(HTML)</div>
                        <Editor
                          defaultValue={et.body}
                          height="300px"
                          defaultLanguage="html"
                          options={editorOptions}
                          theme="custom-theme"
                          onMount={handleEditorDidMount}
                        />
                        <div className="pl-2 mt-1 text-[0.75rem]">
                          Available placeholder parameters: <span className="text-[0.6rem] bg-[#d5dce3] rounded-full py-0.5 px-2">{`{ APP_NAME }`}</span>, <span className="text-[0.6rem] bg-[#d5dce3] rounded-full py-0.5 px-2">{`{ APP_URL }`}</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: 'white', // Custom background color
                            color: '#65758c',
                            border: '2px solid #65758c', // Custom text color
                            padding: '4px 20px', // Custom padding
                            borderRadius: '8px', // Custom border radius
                            boxShadow: 'none',
                            '&:hover': {
                              backgroundColor: '#65758c',
                              boxShadow: 'none', // Custom hover background color
                              color: 'white',
                            },
                            textTransform: 'none',
                            fontSize: '0.875rem'
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              )
            })
          }
        </div>
        <div className="flex justify-end mt-10">
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#007bff', // Custom background color
              color: '#fff', // Custom text color
              padding: '8px 20px', // Custom padding
              borderRadius: '8px', // Custom border radius
              '&:hover': {
                backgroundColor: '#0056b3', // Custom hover background color
              },
              textTransform: 'none',
              fontSize: '0.875rem'
            }}
          >
            Send test email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
