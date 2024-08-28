import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
    {
        name: "reference_code",
    },
    {
        name: "product_part_number",
    },
    {
        name: "product_part_id",
    },
    {
        name: "osc_product_id",
    },
    {
        name: "transaction_line_id",
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
