import { FieldConfig } from "../FormControlWrapper";

const ProfileFormFields: FieldConfig[] = [
    {
        name: "email",
        label: "Email",
        placeholder: "Email",
        rules: { required: "Email is required" },
        type: "text",
        disabled: true,
        size: 2,
    },
    {
        name: "first_name",
        label: "First Name",
        placeholder: "First Name",
        rules: { required: "First Name is required" },
        type: "text",
        size: 1,
    },
    {
        name: "last_name",
        label: "Last Name",
        placeholder: "Last Name",
        rules: { required: "Last Name is required" },
        type: "text",
        size: 1,
    },
];

export default ProfileFormFields;
