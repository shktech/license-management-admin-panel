import { FieldConfig } from "../FormControlWrapper";
import { useFetchOptions } from "@/hooks/useFetchOptions";

const ProfileFormFields: FieldConfig[] = [
    {
        name: "user_id",
        label: "User ID",
        placeholder: "User ID",
        rules: { required: "User ID is required" },
        type: "text",
        size: 2,
    },
    {
        name: "email",
        label: "Email",
        placeholder: "Email",
        rules: { required: "Email is required" },
        type: "text",
        size: 2,
    },
    {
        name: "username",
        label: "Username",
        placeholder: "Username",
        rules: { required: "Username is required" },
        type: "text",
        size: 1,
    },
    {
        name: "organization",
        label: "Organization",
        placeholder: "Organization",
        rules: { required: "Organization is required" },
        type: "text",
        size: 1,
        disabled: true
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
    {
        name: "is_active",
        label: "Is Active",
        placeholder: "Is Active",
        rules: { required: "Is Active is required" },
        type: "switch",
        size: 1,
    },
];

export default ProfileFormFields;
