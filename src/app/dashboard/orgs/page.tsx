"use client";

import { Box, IconButton } from "@mui/material";

import {
  HttpError,
  useGetIdentity,
  useList,
  useNavigation,
} from "@refinedev/core";
import { Organization, User } from "@/types/types";
import { useEffect, useMemo, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { ProductActiveColor } from "@data/ColorData";
import Loader from "@components/common/Loader";
import { tagStyle } from "@data/MuiStyles";
import GenericTable from "@components/Table/GenericTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

const Page = () => {
  const { data: identity, isLoading: isIdentityLoading } =
    useGetIdentity<User>();
  const {
    data: orgs,
    isLoading,
    refetch,
  } = useList<Organization, HttpError>({
    resource: "orgs",
    hasPagination: false,
  });

  useEffect(() => {
    setLoading(isIdentityLoading || isLoading);
  }, [isIdentityLoading, isLoading]);

  const { push } = useNavigation();
  const [orgData, setOrgData] = useState<any[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (identity && orgs) {
      setOrgData(
        orgs?.data.map((org: Organization) => ({
          ...org,
          isCurrent: org.organization_code === identity.organization,
        }))
      );
    }
  }, [identity, orgs]);

  const handleEditClick = (row: Organization) => {
    push(`/dashboard/orgs/edit?organization_code=${row.organization_code}`);
  };
  const handleCreate = () => {
    push("/dashboard/orgs/create");
  };
  const columns = useMemo<MRT_ColumnDef<Organization>[]>(
    () => [
      {
        accessorKey: "organization_code",
        header: "Organization Code",
        size: 200,
      },
      {
        accessorKey: "organization_name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 150,
      },
      {
        accessorKey: "country",
        header: "Country",
        size: 150,
      },
      {
        accessorKey: "active",
        header: "Active",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <Box
            component="span"
            sx={{
              backgroundColor: ProductActiveColor(renderedCellValue as boolean),
              ...tagStyle,
            }}
          >
            {renderedCellValue ? "Active" : "Closed"}
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <div className="pt-6 pb-2.5 xl:pb-1 overflow-x-auto min-h-screen flex flex-col">
      <div className="flex-1">
        {loading ? (
          <Loader />
        ) : (
          <GenericTable
            title={
              <div className="!font-satoshi px-12 py-4 text-2xl font-semibold text-[#1f325c] flex items-center gap-2">
                <FontAwesomeIcon icon={faUserGroup} />
                Organizations
                <div className="text-sm font-normal">
                  ( The organizations that are associated with your account )
                </div>
              </div>
            }
            data={orgData}
            columns={columns}
            canCreate={true}
            handleCreate={handleCreate}
            onRowClick={handleEditClick}
            noSearchNeed={true}
            noSortNeed={true}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
