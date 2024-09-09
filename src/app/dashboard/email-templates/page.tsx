"use client";

import { useList, useNavigation } from "@refinedev/core";
import React, { useMemo } from "react";
import { EmailTemplate } from "@/types/types";
import Loader from "@components/common/Loader";
import GenericTable from "@components/Table/GenericTable";
import { MRT_ColumnDef, MRT_SortingState } from "material-react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Page = () => {
  const { data: emailTemplateData, isLoading } = useList<EmailTemplate>({
    hasPagination: false,
  });

  const { push } = useNavigation();

  const handleRowClick = (row: EmailTemplate) => {
    push(`/dashboard/email-templates/edit?id=${row.email_id}`);
  };

  const handleCreate = () => {
    push(`/dashboard/email-templates/create`);
  };

  const columns = useMemo<MRT_ColumnDef<EmailTemplate>[]>(
    () => [
      {
        accessorKey: "type",
        header: "Type",
        size: 100,
      },
      {
        accessorKey: "event_type",
        header: "Event Type",
        size: 150,
      },
      {
        accessorKey: "subject",
        header: "Subject",
        size: 200,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 200,
      },
    ],
    []
  );

  return (
    <div className="pt-6 pb-2.5 xl:pb-1 overflow-x-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <GenericTable
          title={
            <div className="!font-satoshi px-12 py-4 text-2xl font-semibold text-[#1f325c] flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} />
              Notification Templates
            </div>
          }
          data={emailTemplateData?.data}
          columns={columns}
          canCreate={true}
          onRowClick={handleRowClick}
          noSearchNeed={true}
          noSortNeed={true}
          handleCreate={handleCreate}
        />
      )}
    </div>
  );
};

export default Page;
