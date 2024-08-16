import { getSecondRealFormFields } from "@utils/utilFunctions";
import { SecondInitialFieldConfig } from "../InitialFieldConfig";

const InitialField: SecondInitialFieldConfig[] = [
    { name: "product_part_number", size: 2, required: 'text' },
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
    { name: "product_name", required: 'text', size: 2 },
    { name: "product_description", size: 2 },
    { name: "vendor_name" },
    { name: "vendor_part_number", required: 'text' },
    { name: "license_source_set", size: 2 },
    { name: "source_name" },
    { name: "eval_set_name" },
    { name: "renewal_set_name" },
    { name: "new_set_name" },
    { name: "active", type: 'switch' },
];

export default getSecondRealFormFields(InitialField);
