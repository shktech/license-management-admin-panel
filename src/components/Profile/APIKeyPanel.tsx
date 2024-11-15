import { Box, Button, Modal, SnackbarCloseReason } from "@mui/material";
import { useCreate, useCustomMutation, useList } from "@refinedev/core";
import React, { useState } from "react";
import { getFormattedDate } from "@utils/utilFunctions";
import { modalOkBtnStyle, modalStyle } from "@data/MuiStyles";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import { APIKey } from "../../types/types";
import RedditTextField from "@components/common/RedditTextField";
import SnackbarComponent from "@components/common/SnackbarComponent";

interface APIKeyPanelProps {}

const APIKeyPanel: React.FC<APIKeyPanelProps> = () => {
  const {
    data: apiData,
    refetch,
    isLoading,
  } = useList({
    resource: "orgs/key/api-key",
    hasPagination: false,
  });

  const [generatedAPIKey, setGeneratedAPIKey] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleSuccessGenerated = (res: any) => {
    handleOpenDeleteModal();
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

  const apiKey = apiData?.data as APIKey;

  const { mutate: createAPIKey } = useCreate();
  const { mutate: deleteAPIKey } = useCustomMutation();

  const handleGenerateBtn = () => {
    createAPIKey(
      {
        resource: "orgs/key/api-key",
        values: {},
      },
      {
        onError: () => refetch(),
        onSuccess: (res) => handleSuccessGenerated(res),
      }
    );
  };

  const handleDeleteKeyBtn = () => {
    deleteAPIKey(
      {
        url: "orgs/key/api-key",
        method: "delete",
        values: { id: apiKey.id },
      },
      {
        onError: (error) => console.error(error),
        onSuccess: () => refetch(),
      }
    );
  };

  const apiDataKeys = [
    { key: "name", label: "Name", value: apiKey?.name },
    {
      key: "created",
      label: "Created at",
      value: getFormattedDate(apiKey?.created),
    },
    {
      key: "revoked",
      label: "Revoked",
      value: (
        <div
          className={`rounded-full h-4 w-4 ${apiKey?.revoked ? "bg-[#11ba82]" : "bg-[#929ea8]"}`}
        ></div>
      ),
    },
  ];

  return (
    <div className="px-8 py-1">
      <div className="text-lg text-[#1f325c] font-semibold pb-8 flex justify-between">
        API Keys
        {apiData?.data ? (
          <Button
            onClick={handleDeleteKeyBtn}
            variant="contained"
            sx={modalOkBtnStyle}
          >
            Delete
          </Button>
        ) : (
          <Button
            onClick={handleGenerateBtn}
            variant="contained"
            sx={modalOkBtnStyle}
          >
            Generate Key
          </Button>
        )}
      </div>
      <div className="pb-6">
        {apiData?.data ? (
          apiDataKeys.map((adk) => (
            <div
              key={adk.key}
              className="grid grid-cols-3 border-b border-[#d5dce3] py-1.5 px-8 items-center justify-center"
            >
              <div className="font-medium">{adk.label}</div>
              <div className="col-span-2">{adk.value}</div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center text-[#848fa7] text-lg font-medium">
            There is no API Key
          </div>
        )}
      </div>
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
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
      <SnackbarComponent open={openSnackbar} onClose={handleSnackbarClose} />
    </div>
  );
};

export default APIKeyPanel;
