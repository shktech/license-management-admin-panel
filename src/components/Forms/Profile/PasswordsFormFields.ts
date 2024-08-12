import { FieldConfig } from "../FormControlWrapper";
import { useFetchOptions } from "@/hooks/useFetchOptions";

const PasswordsFormFields: FieldConfig[] = [
    {
        name: "password",
        label: "Current Password",
        placeholder: "Current Password",
        rules: { required: "Current is required" },
        type: "text",
        size: 2,
    },
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
