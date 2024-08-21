import { getRealFormFields } from "@utils/utilFunctions";
import { InitialFieldConfig } from "../InitialFieldConfig";

const OrganizationEditFormInitialFields: InitialFieldConfig[] = [
    {
        name: "organization_code",
        required: "text",
        disabled: true,
        size: 1,
    },
    {
        name: "organization_name",
        required: "text",
        size: 1,
    },
    {
        name: "address",
        required: "text",
        size: 2,
    },
    {
        name: "country",
        required: "text",
        size: 2,
    },
    {
        name: "active",
        type: "switch"
    },
];

const OrganizationCreateInitialFields: InitialFieldConfig[] = [
    {
        name: "organization_code",
        required: "text",
        size: 1,
    },
    {
        name: "organization_name",
        required: "text",
        size: 1,
    },
    {
        name: "address",
        required: "text",
        size: 2,
    },
    {
        name: "country",
        required: "text",
        size: 2,
    }
];

const OrganizationEditFormFields = getRealFormFields(OrganizationEditFormInitialFields);
const OrganizationCreateFormFields = getRealFormFields(OrganizationCreateInitialFields);

export { OrganizationCreateFormFields, OrganizationEditFormFields };