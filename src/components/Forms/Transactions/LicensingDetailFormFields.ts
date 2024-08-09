import { FieldConfig } from "../FormControlWrapper";
import { useFetchOptions } from "@/hooks/useFetchOptions";

const ProductFormFields: FieldConfig[] = [
    {
        name: "osc_product.osc_part_number",
        label: "Product part number",
        placeholder: "Product part number",
        rules: { required: "Part number is required" },
        // type: "text",
        type: "dropdown",
        size: 2,
        resource: "products",
        valueKey: "osc_part_number",
        labelKey: "osc_part_number",
    },
    {
        name: "osc_product.vendor_name",
        label: "Vendor name",
        placeholder: "Vendor name",
        rules: { required: "Vendor name is required" },
        type: "text",
        size: 2,
        disabled: true
    },
    {
        name: "osc_product.vendor_part_number",
        label: "Vendor part number",
        placeholder: "Vendor part number",
        rules: { required: "Vendor part number is required" },
        type: "text",
        size: 2,
        disabled: true
    },
    {
        name: "osc_product.license_type",
        label: "License Type",
        placeholder: "License Type",
        rules: { required: "License Type is required" },
        type: "dropdown",
        size: 1,
        options: [
            { value: "Eval", label: "Eval" },
            { value: "Subscription", label: "Subscription" },
            { value: "NFR", label: "NFR" },
            { value: "Promotion", label: "Promotion" },
        ],
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
    {
        name: "asset.id",
        label: "Asset ID",
        placeholder: "Asset ID",
        rules: { required: "Asset id is required" },
        type: "text",
        size: 2,
    },
    {
        name: "reference_code",
        label: "Reference code",
        placeholder: "Reference code",
        rules: { required: "Reference code is required" },
        type: "text",
        size: 2,
    },
];

export default ProductFormFields;
