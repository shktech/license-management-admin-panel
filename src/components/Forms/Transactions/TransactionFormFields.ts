import { FieldConfig } from "../FormControlWrapper";
import { useFetchOptions } from "@/hooks/useFetchOptions";

const TransactionFormFields: FieldConfig[] = [
    {
        name: "transaction_source",
        label: "Transaction source",
        placeholder: "Select option",
        rules: { required: "Transaction source is required" },
        type: "dropdown",
        options: [
            { value: "Oracle ERP", label: "Oracle ERP" },
            { value: "Prod Reg", label: "Prod Reg" },
            { value: "Manual", label: "Manual" },
        ],
    },
    {
        name: "transaction_type",
        label: "Transaction type",
        placeholder: "Select option",
        rules: { required: "Transaction type is required" },
        type: "dropdown",
        options: [
            { value: "Sales", label: "Sales" },
            { value: "Eval", label: "Eval" },
            { value: "Rental", label: "Rental" },
            { value: "Subscription", label: "Subscription" },
        ],
    },
    {
        name: "transaction_action",
        label: "Transaction action",
        placeholder: "Select option",
        rules: { required: "Transaction action is required" },
        type: "dropdown",
        options: [
            { value: "New", label: "New" },
            { value: "Update", label: "Update" },
            { value: "Renewal", label: "Renewal" },
            { value: "Revoke", label: "Revoke" },
        ],
    },
    {
        name: "source_reference_number",
        label: "Source ref number",
        placeholder: "Source ref number",
        rules: { required: "Source ref number is required" },
        type: "text",
    },
    {
        name: "source_reference_date",
        label: "Source ref date",
        placeholder: "Source ref date",
        rules: { required: "Source ref date is required" },
        type: "date",
    },
    {
        name: "source_reference_id",
        label: "Source ref id",
        placeholder: "Source ref id",
        rules: { required: "Source ref id is required" },
        type: "text",
    },
    {
        name: "asset.id",
        label: "Asset ID",
        placeholder: "Asset ID",
        rules: { required: "Asset id is required" },
        type: "text",
    },
    {
        name: "osc_product.osc_part_number",
        label: "Product part number",
        placeholder: "Product part number",
        rules: { required: "Part number is required" },
        // type: "text",
        type: "dropdown",
        resource: "products",
        valueKey: "osc_part_number",
        labelKey: "osc_part_number"
    },
    {
        name: "osc_product.vendor_name",
        label: "Vendor name",
        placeholder: "Vendor name",
        rules: { required: "Vendor name is required" },
        type: "text",
    },
    {
        name: "osc_product.vendor_part_number",
        label: "Vendor part number",
        placeholder: "Vendor part number",
        rules: { required: "Vendor part number is required" },
        type: "text",
    },
    {
        name: "reference_code",
        label: "Reference code",
        placeholder: "Reference code",
        rules: { required: "Reference code is required" },
        type: "text",
    },
    {
        name: "quantity",
        label: "Transaction quantity (Seats)",
        placeholder: "Transaction quantity",
        rules: { required: "Transaction quantity is required" },
        type: "number",
    },
    {
        name: "start_date",
        label: "Start date",
        placeholder: "Transaction quantity",
        rules: { required: "Start date is required" },
        type: "date",
    },
    {
        name: "end_date",
        label: "End date",
        placeholder: "Transaction quantity",
        rules: { required: "End date is required" },
        type: "date",
    },
];

export default TransactionFormFields;
