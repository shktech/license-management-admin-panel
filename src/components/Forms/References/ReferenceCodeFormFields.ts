import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
    {
        name: "reference_code", size: 2
    },
    {
        name: "product_part_number",
    },
    {
        name: "product_part_id",
    },
    {
        name: "osc_product_id",
        type: "dropdown",
        required: 'text',
        resource: "products",
        valueKey: "product_id",
        labelKey: "product_id",
        size: 2,
    },
    {
        name: "transaction_line_id",
        size: 2,
    },
    {
        name: "start_date",
        type: "date",
    },
    {
        name: "end_date",
        type: "date",
    },
];

export default getRealFormFields(InitialField);
