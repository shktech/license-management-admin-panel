"use client";

import { useList } from "@refinedev/core";
import React, { useEffect, useState } from "react";
import EmailTemplateComponent from "@components/Forms/EmailTemplates/EmailTemplate";
import { EmailTemplate } from "@/types/types";

const Page = () => {
  const { data, refetch, isLoading } = useList<EmailTemplate>({
    resource: "email-templates",
  });

  const [eTData, setETData] = useState<EmailTemplate[]>();

  useEffect(() => {
    setETData(data?.data);
  }, [isLoading]);

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChangeAccordian =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="flex w-full justify-center text-black text-sm py-8">
      <div className="min-w-[800px] rounded-xl px-8 py-8 shadow-md bg-white">
        <div className="text-lg font-medium pb-4 text-[#515f72]">
          Configure common settings for sending emails
        </div>
        <div>
          {eTData?.map((et: EmailTemplate, i: number) => (
            <EmailTemplateComponent
              key={et.email_id}
              template={et}
              expanded={expanded}
              handleChangeAccordian={handleChangeAccordian}
              onSave={refetch}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
