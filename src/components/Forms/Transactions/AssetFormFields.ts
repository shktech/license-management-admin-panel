import { FieldConfig } from "../FormControlWrapper";
import { useFetchOptions } from "@/hooks/useFetchOptions";

const AssetFormFields: FieldConfig[] = [
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

export default AssetFormFields;
