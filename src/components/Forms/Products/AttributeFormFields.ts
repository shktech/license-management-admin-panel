import { FieldConfig } from "../FormControlWrapper";
import { useFetchOptions } from "@/hooks/useFetchOptions";

const AttributeFormFields: FieldConfig[] = [
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

export default AttributeFormFields;
