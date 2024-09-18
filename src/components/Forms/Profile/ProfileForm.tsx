import { IOSSwitch } from "@components/Input/GeneralSwitch";
import { modalOkBtnStyle } from "@data/MuiStyles";
import { Button, Collapse, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../../../types/types";
import GenericForm from "../GenericForm";
import PasswordsFormFields from "./PasswordsFormFields";
import ProfileFormFields from "./ProfileFormFields";
import useStore from "@hooks/globalStore";
import { useForm } from "@refinedev/react-hook-form";
import { useCustomMutation } from "@refinedev/core";
import { getPasswordValidationMessage } from "@utils/utilFunctions";
export type ProfileFormProps = {
  identity: any;
  refetchUser: () => void;
};

const ProfileForm: React.FC<ProfileFormProps> = ({ identity, refetchUser }) => {
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
      setError("password1", {
        type: "manual",
        message: getPasswordValidationMessage(data.password1),
      });
      if (data.password1 != data.password2) {
        setError("password2", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }
      updateData.old_password = data.password;
      updateData.new_password = data.password1;
    }
    updateUser(
      {
        url: "user",
        method: "patch",
        values: updateData,
      },
      {
        onError: () => {},
        onSuccess: () => {
          const updatedUser = {
            ...identity,
            first_name: updateData.first_name,
            last_name: updateData.last_name,
          };
          useStore.getState().setUser(updatedUser);
          refetchUser();
        },
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
