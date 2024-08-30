import { getRealFormFields } from "@utils/utilFunctions";
import { InitialFieldConfig } from "../InitialFieldConfig";

const InitialField: InitialFieldConfig[] = [
    { name: "product_part_number",  required: 'text' },
    { name: "product_name", required: 'text'},
    { name: "product_description", size: 2 },
    { name: "product_type", required: 'text' },
    {
        name: "duration",
        required: 'text',
        type: "dropdown",
        options: [
            { value: "EA", label: "EA" },
            { value: "1YR", label: "1YR" },
            { value: "2YR", label: "2YR" },
            { value: "3YR", label: "3YR" },
        ],
    },
    { name: "vendor_name" },
    { name: "vendor_part_number", required: 'text' },
    { name: "license_source_set" },
    { name: "source_name" },
    { name: "eval_set_name" },
    { name: "renewal_set_name" },
    { name: "new_set_name" },
    { name: "active", type: 'switch' },
];

export default getRealFormFields(InitialField);
