"use client";

import { Box, Modal, SnackbarCloseReason } from "@mui/material";

import { useCreate, useList, useNavigation, useUpdate } from "@refinedev/core";
import { APIKey } from "@/types/types";
import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { ProductActiveColor } from "@data/ColorData";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import Loader from "@components/common/Loader";
import { modalStyle, tagStyle } from "@data/MuiStyles";
import GenericTable from "@components/Table/GenericTable";
import RedditTextField from "@components/common/RedditTextField";
import SnackbarComponent from "@components/common/SnackbarComponent";
import CreateModal from "@components/APIKey/CreateModal";
import RevokeModal from "@components/APIKey/RevokeModal";
import { getFormattedDate } from "@utils/utilFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";

const Page = () => {
  const {
    data: apiKeysData,
    isLoading,
    refetch,
  } = useList<APIKey>({
    hasPagination: false,
  });

  const [generatedAPIKey, setGeneratedAPIKey] = useState("");
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openRevokeModal, setOpenRevokeModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedAPIKey, setSelectedAPIKey] = useState<APIKey | null>(null);
  const { mutate: createAPIKey } = useCreate();
  const { mutate: revokeAPIKey } = useUpdate();
  const handleRevoke = (row: APIKey) => {
    setSelectedAPIKey(row);
    handleOpenRevokeModal();
  };
  const handleCreate = () => {
    handleOpenCreateModal();
  };

  const handleOpenSuccessModal = () => setOpenSuccessModal(true);
  const handleCloseSuccessModal = () => setOpenSuccessModal(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);
  const handleOpenRevokeModal = () => setOpenRevokeModal(true);
  const handleCloseRevokeModal = () => setOpenRevokeModal(false);
  const handleRevokeAPIKey = (name: string, revoke: boolean) => {
    revokeAPIKey(
      {
        resource: "orgs/key/api-keys",
        id: selectedAPIKey?.id as string,
        values: {
          name: name,
          revoked: revoke,
        },
      },
      {
        onError: () => {},
        onSuccess: (res) => {
          refetch();
        },
      }
    );
    handleCloseRevokeModal();
  };
  const handleCreateAPIKey = (name: string, orgId: string) => {
    createAPIKey(
      {
        resource: "orgs/key/api-keys",
        values: {
          organization: orgId,
          name: name,
        },
      },
      {
        onError: () => {
          handleCloseCreateModal();
          refetch();
        },
        onSuccess: (res) => {
          handleCloseCreateModal();
          handleSuccessGenerated(res);
        },
      }
    );
  };
  const handleSuccessGenerated = (res: any) => {
    handleOpenSuccessModal();
    setGeneratedAPIKey(res.data.key);
  };
  const handleSnackbarOpen = () => setOpenSnackbar(true);
  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };
  const columns = useMemo<MRT_ColumnDef<APIKey>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 300,
      },
      {
        accessorKey: "created",
        header: "Created At",
        size: 300,
        Cell: ({ renderedCellValue }) => {
          return <div>{getFormattedDate(renderedCellValue)}</div>;
        },
      },
      {
        accessorKey: "organization",
        header: "Organization",
        size: 300,
      },
      {
        accessorKey: "revoked",
        header: "Revoked",
        size: 200,
        Cell: ({ renderedCellValue }) => (
          <Box
            component="span"
            sx={{
              backgroundColor: ProductActiveColor(renderedCellValue as boolean),
              ...tagStyle,
            }}
          >
            {renderedCellValue ? "Revoked" : "Closed"}
          </Box>
        ),
      },
      // {
      //   accessorKey: "actions",
      //   header: "Actions",
      //   size: 30,
      //   Cell: ({ row }) => (
      //     <div className="flex gap-2">
      //       <button
      //         onClick={() => handleRevoke(row.original)}
      //         disabled={!row.original.revoked}
      //         className={`
      //           flex items-center gap-1 text-[13px] text-[#1f325c] font-medium hover:text-[#4a6297] cursor-pointer rounded-full px-2 py-1
      //           ${!row.original.revoked ? "opacity-50 cursor-not-allowed" : ""}
      //         `}
      //       >
      //         <EditOutlinedIcon fontSize="small" />
      //         Edit
      //       </button>
      //     </div>
      //   ),
      // },
    ],
    []
  );

  return (
    <div className="pt-6 pb-2.5 xl:pb-1 overflow-x-auto min-h-screen flex flex-col">
      <div className="flex-1">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex-1">
              <GenericTable
                title={
                  <div className="!font-satoshi px-12 py-4 text-2xl font-semibold text-[#1f325c] flex items-center gap-2">
                    <FontAwesomeIcon icon={faKey} />
                    API Keys
                  </div>
                }
                data={apiKeysData?.data}
                columns={columns}
                canCreate={true}
                handleCreate={handleCreate}
                noSearchNeed={true}
                noSortNeed={true}
                addText="Create API Key"
              />
            </div>
            <CreateModal
              openModal={openCreateModal}
              handleCloseModal={handleCloseCreateModal}
              handleCreate={handleCreateAPIKey}
            />
            <RevokeModal
              selectedAPIKey={selectedAPIKey}
              openModal={openRevokeModal}
              handleCloseModal={handleCloseRevokeModal}
              handleRevoke={handleRevokeAPIKey}
            />
            <Modal
              open={openSuccessModal}
              onClose={handleCloseSuccessModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={{ ...modalStyle, width: 500 }}>
                <div className="text-base text-[#11ba82] font-medium flex items-center gap-1">
                  <CheckBoxRoundedIcon />
                  Successfully Generated
                </div>
                <RedditTextField
                  label="API Key"
                  value={generatedAPIKey}
                  variant="filled"
                  style={{ marginTop: 11 }}
                  onCopy={handleSnackbarOpen}
                />
              </Box>
            </Modal>
            <SnackbarComponent
              open={openSnackbar}
              onClose={handleSnackbarClose}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
