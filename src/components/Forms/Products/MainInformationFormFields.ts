import { getRealFormFields } from "@utils/utilFunctions";
import { InitialFieldConfig } from "../InitialFieldConfig";

const InitialField: InitialFieldConfig[] = [
  { name: "product_part_number", required: "text" },
  { name: "product_name", required: "text" },
  { name: "product_description", size: 2, required: "text" },
  {
    name: "product_type",
    type: "dropdown",
    required: "text",
    resource: "lookups/PRODUCT_TYPE/values",
    valueKey: "value",
    labelKey: "value",
  },
  {
    name: "duration",
    type: "dropdown",
    required: "text",
    resource: "lookups/UOM_DURATION/values",
    valueKey: "value",
    labelKey: "value",
  },
  {
    name: "vendor_name",
    type: "dropdown",
    required: "text",
    resource: "lookups/VENDOR/values",
    valueKey: "value",
    labelKey: "value",
  },
  {
    name: "vendor_part_number",
    type: "dropdown",
    required: "text",
    resource: "lookups/VENDOR_PARTS/values",
    valueKey: "value",
    labelKey: "value",
  },
  {
    name: "license_source",
    type: "dropdown",
    required: "text",
    resource: "lookups/LICENSE_SOURCE/values",
    valueKey: "value",
    labelKey: "value",
  },
  {
    name: "source_name",
    type: "dropdown",
    required: "text",
    resource: "lookups/SOURCE_API_NAME/values",
    valueKey: "value",
    labelKey: "value",
  },
  // { name: "license_source_set" },
  // { name: "source_name" },
  // { name: "eval_set_name" },
  // { name: "renewal_set_name" },
  // { name: "new_set_name" },
  // {
  //   name: "email_template",
  //   name2: "email_id",
  //   type: "dropdown",
  //   required: "text",
  //   resource: "email-templates",
  //   valueKey: "email_id",
  //   labelKey: "name",
  // },
  { name: "active", type: "switch", required: "text" },
];

export default getRealFormFields(InitialField);
