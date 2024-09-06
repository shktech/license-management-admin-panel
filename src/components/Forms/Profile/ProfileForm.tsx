import { IOSSwitch } from "@components/Input/GeneralSwitch";
import { modalOkBtnStyle } from "@data/MuiStyles";
import { Button, Collapse, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../../../types/types";
import { GenericFormProps } from "../FormControlWrapper";
import GenericForm from "../GenericForm";
import PasswordsFormFields from "./PasswordsFormFields";
import ProfileFormFields from "./ProfileFormFields";

import { useForm } from "@refinedev/react-hook-form";
import { useCustomMutation } from "@refinedev/core";
export type ProfileFormProps = {
  identity: any;
};

const ProfileForm: React.FC<ProfileFormProps> = ({ identity }) => {
  const [changePassword, setChangePassword] = useState(false);

  const handleChange = () => {
    setChangePassword((prev) => !prev);
  };

  const {
    control,
    trigger,
    reset,
    getValues,
    setError,
    formState: { errors },
  } = useForm<User>();

  useEffect(() => {
    reset(identity);
  }, [identity]);
  const { mutate: updateUser } = useCustomMutation();
  const handleSubmit = () => {
    const data = getValues();

    const updateData: any = {
      first_name: data.first_name,
      last_name: data.last_name,
    };
    if (changePassword) {
      if (data.password1 == "") {
        setError("password1", {
          type: "manual",
          message: "This field is required",
        });
        return;
      }
      if (data.password1 != data.password2) {
        setError("password2", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }
      updateData.password = data.password1;
    }
    updateUser(
      {
        url: "user",
        method: "patch",
        values: updateData,
      },
      {
        onError: () => {},
        onSuccess: () => {},
      }
    );
  };
  return (
    <div className="flex flex-col gap-6">
      <GenericForm
        {...{ control, errors, trigger, fields: ProfileFormFields }}
      />
      <FormControlLabel
        control={
          <IOSSwitch
            checked={changePassword}
            onChange={handleChange}
            sx={{ mx: 1 }}
          />
        }
        label="Change the Password"
      />
      <Collapse in={changePassword}>
        <GenericForm
          {...{ control, errors, trigger, fields: PasswordsFormFields }}
        />
      </Collapse>
      <div className="flex justify-end gap-4">
        <Button variant="contained" sx={modalOkBtnStyle} onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default ProfileForm;
