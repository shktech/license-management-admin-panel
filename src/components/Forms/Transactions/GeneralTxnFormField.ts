import { FieldConfig } from "../FormControlWrapper";
import { useFetchOptions } from "@/hooks/useFetchOptions";
import { SecondInitialFieldConfig } from "../InitialFieldConfig";
import { getSecondRealFormFields } from "@utils/utilFunctions";

const InitialField: SecondInitialFieldConfig[] = [
    {
        name: "transaction_source",
        type: "dropdown",
        size: 2,
        required: 'text',
        options: [
            { value: "Oracle ERP", label: "Oracle ERP" },
            { value: "Prod Reg", label: "Prod Reg" },
            { value: "Manual", label: "Manual" },
        ],
    },
    {
        name: "transaction_action",
        type: "dropdown",
        required: 'text',
        options: [
            { value: "New", label: "New" },
            { value: "Update", label: "Update" },
            { value: "Renewal", label: "Renewal" },
            { value: "Revoke", label: "Revoke" },
        ],
    },
    { name: "source_reference_number" },
    { name: "source_reference_date", type: "date", required: 'text'},
    { name: "source_reference_id" },


];

export const GeneralTxnFormField = getSecondRealFormFields(InitialField);