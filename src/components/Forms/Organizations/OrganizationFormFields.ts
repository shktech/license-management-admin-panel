import { getSecondRealFormFields } from "@utils/utilFunctions";
import { SecondInitialFieldConfig } from "../InitialFieldConfig";

const OrganizationEditFormInitialFields: SecondInitialFieldConfig[] = [
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

const OrganizationCreateInitialFields: SecondInitialFieldConfig[] = [
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

const OrganizationEditFormFields = getSecondRealFormFields(OrganizationEditFormInitialFields);
const OrganizationCreateFormFields = getSecondRealFormFields(OrganizationCreateInitialFields);

export { OrganizationCreateFormFields, OrganizationEditFormFields };