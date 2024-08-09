import { FieldConfig } from "../FormControlWrapper";
import { useFetchOptions } from "@/hooks/useFetchOptions";

const ResellerFormFields: FieldConfig[] = [
    {
        name: "reseller",
        label: "Reseller",
        placeholder: "Reseller",
        rules: { required: "Reselller is required" },
        type: "text",
        size: 2,
    },
];

export default ResellerFormFields;
