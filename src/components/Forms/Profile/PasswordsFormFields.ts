import { FieldConfig } from "../FormControlWrapper";

const PasswordsFormFields: FieldConfig[] = [
    {
        name: "password1",
        label: "New Password",
        placeholder: "New Password",
        rules: { required: "New Password is required" },
        type: "text",
        size: 2,
    },
    {
        name: "password2",
        label: "Confirm Password",
        placeholder: "Confirm Password",
        rules: { required: "Confirm Password is required" },
        type: "text",
        size: 2,
    },
];

export default PasswordsFormFields;
