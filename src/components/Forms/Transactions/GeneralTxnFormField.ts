import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialCreateField: InitialFieldConfig[] = [
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

const InitialEditField: InitialFieldConfig[] = [
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
        newAction: getRealFormFields(InitialCreateField),
        notNewAction: getRealFormFields([...InitialCreateField, { name: "license_key", size: 2, disabled: true },]),
    },
    EditTransactionForm: getRealFormFields(InitialEditField),
}