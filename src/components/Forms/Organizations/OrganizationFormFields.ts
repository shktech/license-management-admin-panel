import { getRealFormFields } from "@utils/utilFunctions";
import { InitialFieldConfig } from "../InitialFieldConfig";

const OrganizationEditFormInitialFields: InitialFieldConfig[] = [
  {
    name: "organization_code",

    disabled: true,
    size: 1,
  },
  {
    name: "organization_name",

    size: 1,
  },
  {
    name: "address",

    size: 2,
  },
  {
    name: "country",

    size: 2,
  },
  {
    name: "active",
    type: "switch",
  },
];

const OrganizationCreateInitialFields: InitialFieldConfig[] = [
  {
    name: "organization_code",

    size: 1,
  },
  {
    name: "organization_name",

    size: 1,
  },
  {
    name: "address",

    size: 2,
  },
  {
    name: "country",

    size: 2,
  },
];

const OrganizationEditFormFields = getRealFormFields(
  OrganizationEditFormInitialFields
);
const OrganizationCreateFormFields = getRealFormFields(
  OrganizationCreateInitialFields
);

export { OrganizationCreateFormFields, OrganizationEditFormFields };
