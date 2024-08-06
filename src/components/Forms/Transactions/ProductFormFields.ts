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
];

export default ProductFormFields;
