"use client";
import { MRT_ColumnDef } from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { useCustom, useNavigation, useOne, useTable } from "@refinedev/core";
import Loader from "@components/common/Loader";
import GenericTable from "@components/Table/GenericTable";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import StateComponent from "@components/common/StateComponent";
import { Report } from "@/types/types";
import { getFormattedDate } from "@utils/utilFunctions";
import DownloadIcon from '@mui/icons-material/Download';

const HomePage: React.FC = () => {
  const {
    tableQueryResult: { data, isLoading, refetch },
  } = useTable<Report>({
    hasPagination: false,
  });

  const [downloadId, setDownloadId] = useState<string>('')

  const { push } = useNavigation();

  const handleCreate = () => {
    push("/dashboard/reports/create");
  };

  const reportsData = data?.data.map((d) => ({
    ...d,
    created_at: getFormattedDate(d?.created_at),
    start_date: getFormattedDate(d?.start_date),
    end_date: getFormattedDate(d?.end_date),
  })) as Report[];

  const { data: downloadData, isLoading: downloadLoading, refetch: refetchDownload } = useOne(downloadId ? {
    resource: "reports",
    id: downloadId !== undefined ? downloadId : undefined, // Ensure id is only set if downloadId is defined
  } : { resource: "reports", id: undefined }); // Return a valid object instead of undefined

  useEffect(() => {
    if (downloadData) {
      const csvData = downloadData.data as any; // Assuming downloadData.data contains the array of reports
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reports.csv'; // Set the desired filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // Clean up the URL object
    }
  }, [downloadData])
  const handleDownload = (id: string) => {
    setDownloadId(id);
  };

  useEffect(() => {
    refetchDownload
  }, [downloadId])

  const columns = useMemo<MRT_ColumnDef<Report>[]>(
    () => [
      {
        accessorKey: "created_at",
        header: "Generated Date",
        size: 200,
      },
      {
        accessorKey: "start_date",
        header: "Start Date",
        size: 200,
      },
      {
        accessorKey: "end_date",
        header: "End Date",
        size: 200,
      },
      {
        accessorKey: "created_by.email",
        header: "Generated By",
        size: 200,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        pin: "right",
        size: 100,
        enableSorting: false,
        enablePinning: true,
        Cell: ({ row }) => (
          <div className="flex gap-4">
            <DownloadIcon
              onClick={() => handleDownload(row.original.id as string)}
              fontSize="small"
              className="text-[#818f99] hover:text-black cursor-pointer"
            />
          </div>
        ),
      }
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
              <DnsRoundedIcon />
              Reports
            </div>
          }
          data={reportsData}
          columns={columns}
          canCreate={true}
          handleCreate={handleCreate}
          noSearchNeed={true}
          noSortNeed={true}
        />
      )}
    </div>
  );
};

export default HomePage;