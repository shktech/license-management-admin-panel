import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useCreate, useGetIdentity, useTable } from "@refinedev/core";
import { Role, User } from "@/types/types";
import React, { useMemo, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { modalOkBtnStyle, sendEmailBtnStyle } from "@data/MuiStyles";
import WavingHandIcon from "@mui/icons-material/WavingHand";
const MemeberInvitePanel: React.FC = () => {
  const { data: identity } = useGetIdentity<User>();
  const {
    tableQueryResult: { data: rolesData, isLoading: isRolesLoading, refetch },
  } = useTable<Role>({
    resource: "roles",
    hasPagination: false,
  });

  const [sentValues, setSentValues] = useState<any[]>([
    {
      email: "",
      role_id: "",
    },
  ]);

  const handleAddMore = () => {
    setSentValues([
      ...sentValues,
      {
        email: "",
        role_id: "",
      },
    ]);
  };
  const handleRemove = (index: number) => {
    const newValues = sentValues.filter((_, i) => i !== index);
    setSentValues(newValues);
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newValues = [...sentValues];
    newValues[index].email = e.target.value;
    setSentValues(newValues);
  };
  const handleRoleChange = (e: SelectChangeEvent, index: number) => {
    const newValues = [...sentValues];
    newValues[index].role_id = e.target.value;
    setSentValues(newValues);
  };

  const { mutate } = useCreate();
  const handleInvite = () => {
    mutate(
      {
        resource: "invite",
        values: sentValues,
      },
      {
        onSuccess: () => console.log("success"),
      }
    );
  };

  return (
    <div className="px-12 pb-4 pt-10">
      <div className="text-xl text-sm font-semibold py-4 text-[#1f325c] flex justify-between">
        <div className="flex items-center gap-2">
          <WavingHandIcon />
          Invite new members by email address
        </div>
        <Button
          variant="outlined"
          color="primary"
          sx={{ textTransform: "none" }}
          onClick={handleAddMore}
        >
          <AddOutlinedIcon fontSize="small" />
          Add more
        </Button>
      </div>
      <div className="flex gap-8 mr-14 pb-4">
        <div className="text-xs flex-1">Email Address</div>
        <div className="text-xs flex-1">Role</div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-6">
          {sentValues.map((value, index) => (
            <TextField
              id="standard-basic"
              variant="standard"
              placeholder="Enter email address"
              size="small"
              type="email"
              value={value.email}
              onChange={(e) => handleEmailChange(e, index)}
            />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-6">
          {sentValues.map((value, index) => (
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                variant="standard"
                size="small"
                value={value.role}
                label="Age"
                onChange={(e) => handleRoleChange(e, index)}
              >
                {rolesData?.data?.map((role) => (
                  <MenuItem key={role.role_id} value={role.role_id}>
                    {role.name}
                  </MenuItem>
                )) || []}
              </Select>
            </FormControl>
          ))}
        </div>
        <div className="flex flex-col gap-6">
          {sentValues.map((value, index) => (
            <div className="flex items-center gap-2">
              <IconButton
                size="small"
                onClick={() => handleRemove(index)}
                disabled={sentValues.length === 1}
              >
                <DoDisturbOnOutlinedIcon fontSize="small" />
              </IconButton>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button sx={modalOkBtnStyle} onClick={handleInvite}>
          Invite members
        </Button>
      </div>
    </div>
  );
};

export default MemeberInvitePanel;
