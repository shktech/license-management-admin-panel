import { getRealFormFields } from "@utils/utilFunctions";
import { InitialFieldConfig } from "../InitialFieldConfig";

const InitialField: InitialFieldConfig[] = [
  { name: "product_part_number" },
  { name: "product_name" },
  { name: "product_description", size: 2 },
  {
    name: "product_type",
    type: "dropdown",
    
    resource: "lookups/PRODUCT_TYPE/values",
    valueKey: "value",
    labelKey: "value",
  },
  {
    name: "duration",
    type: "dropdown",
    
    resource: "lookups/UOM_DURATION/values",
    valueKey: "value",
    labelKey: "value",
  },
  { name: "vendor_name" },
  { name: "vendor_part_number" },
  {
    name: "license_source",
    type: "dropdown",
    
    resource: "lookups/LICENSE_SOURCE/values",
    valueKey: "value",
    labelKey: "value",
  },
  { name: "source_name" },
  // { name: "license_source_set" },
  // { name: "source_name" },
  // { name: "eval_set_name" },
  // { name: "renewal_set_name" },
  // { name: "new_set_name" },
  {
    name: "email_template",
    name2: "email_id",
    type: "dropdown",
    
    resource: "email-templates",
    valueKey: "email_id",
    labelKey: "type",
  },
  { name: "active", type: "switch" },
];

export default getRealFormFields(InitialField);
