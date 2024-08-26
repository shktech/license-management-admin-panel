"use client";

import { Box, IconButton } from "@mui/material";

import { HttpError, useGetIdentity, useList } from "@refinedev/core";
import { Organization, User } from "@/types/types";
import { useEffect, useMemo, useState } from "react";
import OrganizationDetailDrawer from "@components/Organizations/OrganizationDrawer";
import { MRT_ColumnDef } from "material-react-table";
import { ProductActiveColor } from "@data/ColorData";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Loader from "@components/common/Loader";
import CommonTable from "@components/Table/CommonTable";
import { tagStyle } from "@data/MuiStyles";

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

  const [orgData, setOrgData] = useState<any[]>();
  const [loading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [clickedOrg, setClickedOrg] = useState<Organization | null>(null);

  useEffect(() => {
    if (identity && orgs) {
      setOrgData(orgs?.data.map((org: Organization) => ({
        ...org,
        isCurrent: org.organization_code === identity.organization
      })))
    }
  }, [identity, orgs]);

  const handleEditClick = (row: Organization) => {
    setClickedOrg(row);
    setOpenDrawer(true);
  };
  const handleCreate = () => setOpenDrawer(true);
  const handleClose = () => {
    refetch();
    setClickedOrg(null);
    setOpenDrawer(false);
  }
  const columns = useMemo<MRT_ColumnDef<any>[]>(
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
          <Box component="span" sx={{ backgroundColor: ProductActiveColor(renderedCellValue as boolean), ...tagStyle }} >
            {renderedCellValue ? "Active" : "Closed"}
          </Box>
        ),
      },
      {
        accessorKey: "actions",
        header: "Action",
        size: 100,
        enableSorting: false,
        pin: 'right',
        Cell: ({ row }) => {
          return (
            <div className="w-full h-full">
              <div className="flex gap-1">
                <IconButton
                  onClick={() => handleEditClick(row.original)}
                  size="small"
                  disabled={!row.original?.isCurrent}
                >
                  <EditOutlinedIcon fontSize="inherit" />
                </IconButton>
              </div>
            </div>
          )
        },
      },
    ],
    []
  );

  return (
    <div className="pt-6 pb-2.5 xl:pb-1 overflow-x-auto">
      {
        loading ?
          <Loader /> :
          <CommonTable
            title={
              <div className="flex gap-4 items-end">
                <div className="text-lg font-semibold">Organizations</div>
                <div className="text-sm font-normal">
                  ( The organizations that are associated with your account )
                </div>
              </div>
            }
            data={orgData}
            columns={columns}
            canCreate={true}
            handleCreate={handleCreate}
          />
      }
      <OrganizationDetailDrawer
        open={openDrawer}
        onClose={handleClose}
        org={clickedOrg}
      />
    </div>
  );
};

export default Page;
