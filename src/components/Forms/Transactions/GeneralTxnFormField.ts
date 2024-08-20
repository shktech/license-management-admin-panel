import { FieldConfig } from "../FormControlWrapper";
import { useFetchOptions } from "@/hooks/useFetchOptions";
import { SecondInitialFieldConfig } from "../InitialFieldConfig";
import { getSecondRealFormFields } from "@utils/utilFunctions";

const InitialCreateField: SecondInitialFieldConfig[] = [
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
            { value: "Renewal", label: "Renewal" },
            { value: "Revoke", label: "Revoke" },
        ],
    },
    { name: "source_reference_number" },
    { name: "source_reference_date", type: "date", required: 'text' },
    { name: "source_reference_id" },
    { name: "waybill_number" },
    { name: "return_waybill_number" },
];

const InitialEditField: SecondInitialFieldConfig[] = [
    {
        name: "transaction_source",
        type: "dropdown",
        size: 2,
        required: 'text',
        disabled: true,
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
        disabled: true,
        options: [
            { value: "New", label: "New" },
            { value: "Renewal", label: "Renewal" },
            { value: "Revoke", label: "Revoke" },
        ],
    },
    { name: "source_reference_number" },
    { name: "source_reference_date", type: "date", required: 'text' },
    { name: "source_reference_id" },
    { name: "waybill_number" },
    { name: "return_waybill_number" },
];

export default {
    CreateTransactionForm: {
        newAction: getSecondRealFormFields(InitialCreateField),
        notNewAction: getSecondRealFormFields([...InitialCreateField, { name: "license_key", size: 2 },]),
    },
    EditTransactionForm: getSecondRealFormFields(InitialEditField),
}