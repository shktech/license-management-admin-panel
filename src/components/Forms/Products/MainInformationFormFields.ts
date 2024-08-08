import { FieldConfig } from "../FormControlWrapper";
import { useFetchOptions } from "@/hooks/useFetchOptions";

const MainInformationFormFields: FieldConfig[] = [
    {
        name: "osc_part_number",
        label: "Product part number",
        placeholder: "Product part number",
        rules: { required: "Part number is required" },
        // type: "text",
        type: "dropdown",
        resource: "products",
        valueKey: "osc_part_number",
        labelKey: "osc_part_number",
        size: 2,
    },
    {
        name: "product_description",
        label: "Product Description",
        placeholder: "Product Description",
        rules: { required: "Product Description is required" },
        type: "text",
        size: 2,
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
];

export default MainInformationFormFields;
