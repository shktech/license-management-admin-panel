import { IOSSwitch } from "@components/Input/GeneralSwitch";
import { modalOkBtnStyle } from "@data/MuiStyles";
import { Button, Collapse, FormControlLabel } from "@mui/material";
import { useState } from "react";
import { User } from "../../../types/types";
import { GenericFormProps } from "../FormControlWrapper";
import GenericForm from "../GenericForm";
import PasswordsFormFields from "./PasswordsFormFields";
import ProfileFormFields from "./ProfileFormFields";

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