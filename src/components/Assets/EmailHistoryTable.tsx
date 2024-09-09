"use client";

import { EmailHistory, Transaction } from "@/types/types";
import GenericTable from "@components/Table/GenericTable";
import { type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { getFormattedDate } from "@utils/utilFunctions";
import { useList } from "@refinedev/core";
import Loader from "@components/common/Loader";

interface EmailHistoryTableProps {
  assetId: string;
}

const EmailHistoryTable: React.FC<EmailHistoryTableProps> = ({ assetId }) => {
  const {
    data: emailHistoryData,
    isLoading,
    refetch,
  } = useList<EmailHistory>({
    resource: `assets/${assetId}/email-logs`,
    hasPagination: false,
  });
  const columns = useMemo<MRT_ColumnDef<EmailHistory>[]>(
    () => [
      {
        accessorKey: "sent_at",
        header: "Sent Data",
        size: 50,
        Cell: ({ renderedCellValue }) => {
          return <div className="text-sm">{getFormattedDate(renderedCellValue as string)}</div>;
        }
      },
      {
        accessorKey: "email_template.type",
        header: "Template Type",
        size: 50,
      },
      {
        accessorKey: "email_template.event_type",
        header: "Event Type",
        size: 50,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 50,
        Cell: ({ renderedCellValue }) => {
          return (
            <div>
              <span
                className={`rounded-full text-xs py-2 px-4 ${renderedCellValue == "success" ? "bg-[#11ba82] text-white" : "bg-[#929ea8] text-black"}`}
              >
                {renderedCellValue}
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <GenericTable
          data={emailHistoryData?.data}
          title={
            <div className="!font-satoshi px-12 py-4 text-2xl font-semibold text-[#1f325c] flex items-center gap-2">
              Email History
            </div>
          }
          noSearchNeed={true}
          noSortNeed={true}
          columns={columns}
        />
      )}
    </>
  );
};

export default EmailHistoryTable;
