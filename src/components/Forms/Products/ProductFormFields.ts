import { FieldConfig } from "../FormControlWrapper";
import { useFetchOptions } from "@/hooks/useFetchOptions";

const ProductFormFields: FieldConfig[] = [
    {
        name: "osc_part_number",
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
        name: "product_type",
        label: "Part Type",
        placeholder: "Part Type",
        rules: { required: "Part Type is required" },
        type: "text",
    },
    {
        name: "duration",
        label: "UOM(Duration)",
        placeholder: "UOM(Duration)",
        rules: { required: "UOM(Duration) is required" },
        type: "text",
    },
    {
        name: "product_description",
        label: "Product Description",
        placeholder: "Product Description",
        rules: { required: "Product Description is required" },
        type: "text",
    },
    {
        name: "vendor_part_number",
        label: "Vender Part Number",
        placeholder: "Vender Part Number",
        rules: { required: "Vender Part Number is required" },
        type: "text",
    },
    {
        name: "license_source_set",
        label: "License Source",
        placeholder: "License Source",
        rules: { required: "License Source is required" },
        type: "text",
    },
    {
        name: "attribute1",
        label: "Attribute1",
        placeholder: "Attribute1",
        rules: { required: "Attribute1 is required" },
        type: "text",
    },
    {
        name: "attribute2",
        label: "Attribute2",
        placeholder: "Attribute2",
        rules: { required: "Attribute2 is required" },
        type: "text",
    },
    {
        name: "attribute3",
        label: "Attribute3",
        placeholder: "Attribute3",
        rules: { required: "Attribute3 is required" },
        type: "text",
    },
    {
        name: "attribute4",
        label: "Attribute4",
        placeholder: "Attribute4",
        rules: { required: "Attribute4 is required" },
        type: "text",
    },
    {
        name: "attribute5",
        label: "Attribute5",
        placeholder: "Attribute5",
        rules: { required: "Attribute5 is required" },
        type: "text",
    },
];

export default ProductFormFields;
