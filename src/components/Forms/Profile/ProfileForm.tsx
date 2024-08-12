import { useState } from "react";
import { Product, User } from "../../../types/types";
import { GenericFormProps } from "../FormControlWrapper";
import GenericForm from "../GenericForm";
import PasswordsFormFields from "./PasswordsFormFields";
import ProfileFormFields from "./ProfileFormFields";
import { Button, Collapse, FormControlLabel, styled, Switch, SwitchProps } from "@mui/material";
import { modalCancelBtnStyle, modalOkBtnStyle } from "@data/MuiStyles";
import { IOSSwitch } from "@components/Input/GeneralSwitch";

export type ProfileFormProps = GenericFormProps & {
    user?: User;
};

const ProfileForm = (props: GenericFormProps) => {
    const [changePassword, setChangePassword] = useState(false);

    const handleChange = () => {
        setChangePassword((prev) => !prev);
    };

    return (
        <div className="flex flex-col gap-6">
            <GenericForm {...{ ...props, fields: ProfileFormFields }} />
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
                <GenericForm {...{ ...props, fields: PasswordsFormFields }} />
            </Collapse>
            <div className="flex justify-end gap-4">
                <Button
                    variant="contained"
                    sx={modalOkBtnStyle}
                >
                    Save
                </Button>
            </div>
        </div>
    )
}

export default ProfileForm;