import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useGetIdentity } from "@refinedev/core";
import { User } from "@/types/types";
import React, { useMemo, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { modalOkBtnStyle, sendEmailBtnStyle } from "@data/MuiStyles";
const MemeberInvitePanel: React.FC = () => {
  const { data: identity } = useGetIdentity<User>();
  const [sentValues, setSentValues] = useState<any[]>([
    {
      email: "",
      role: "",
    },
  ]);

  const handleAddMore = () => {
    setSentValues([
      ...sentValues,
      {
        email: "",
        role: "",
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
    newValues[index].role = e.target.value;
    setSentValues(newValues);
  };
  const handleInvite = () => {
    console.log(sentValues);
  };
  return (
    <div className="px-8 py-4">
      <div className="text-xl text-sm font-semibold py-4 text-[#1f325c] flex justify-between">
        <div>Invite new members by email address</div>
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
                {identity?.roles?.map((role) => (
                  <MenuItem key={role.name} value={role.name}>
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
