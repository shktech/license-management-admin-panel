"use client";

import { Box, IconButton } from "@mui/material";

import { HttpError, useGetIdentity, useList, useNavigation } from "@refinedev/core";
import { Organization, User } from "@/types/types";
import { useEffect, useMemo, useState } from "react";
import OrganizationDetailDrawer from "@components/Organizations/OrganizationDrawer";
import { MRT_ColumnDef } from "material-react-table";
import { ProductActiveColor } from "@data/ColorData";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Loader from "@components/common/Loader";
import CommonTable from "@components/Table/CommonTable";
import { tagStyle } from "@data/MuiStyles";
import ConfirmModal from "@components/common/ConfirmModal";
import APIKeyPanel from "@components/Organizations/APIKeyPanel";

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

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const handleOpenConfirmModal = () => setOpenConfirmModal(true);
  const handleCloseConfirmModal = () => setOpenConfirmModal(false);

  const handleEditClick = (row: Organization) => {
    // setClickedOrg(row);
    // setOpenDrawer(true);

    push(`/dashboard/orgs/edit?organization_code=${row.organization_code}`)

  };
  const handleCreate = () => {
    // setOpenDrawer(true)
    push("/dashboard/orgs/create")
  }
  const handleClose = () => {
    refetch();
    setClickedOrg(null);
    setOpenDrawer(false);
  }
  const handleClickSwitch = (row: Organization) => {
    setClickedOrg(row);
    handleOpenConfirmModal();
  }
  const handleSwitch = async () => {
    const response = await fetch("https://license-management-server-lysrkspm1.vercel.app/authenticate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("tempToken")}`,
      },
      body: JSON.stringify({ organization: clickedOrg?.organization_code }),
    });
    if (response.ok) {
      const data: any = await response.json();
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      window.location.reload();
    }
  }

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "isCurrent",
        header: "Switch",
        size: 100,
        Cell: ({ renderedCellValue, row }) => (
          <div
            onClick={() => handleClickSwitch(row.original)}
            className={`${renderedCellValue ? "border-[#11ba82]" : "border-[#b5b7ba]"} w-5 h-5 p-1 rounded-full border-2 cursor-pointer hover:border-[#11ba82]`}
          >
            {renderedCellValue && <div className="w-full h-full rounded-full bg-[#11ba82]"></div>}
          </div>
        ),
      },
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
      <ConfirmModal
        openModal={openConfirmModal}
        handleCloseModal={handleCloseConfirmModal}
        handleOK={handleSwitch}
      />
      <APIKeyPanel />
    </div>
  );
};

export default Page;
