import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
    { name: "lookup_name", size: 2 },
    { name: "description", size: 2 },
    {
        name: "type",
        type: "dropdown",
        size: 2,
        options: [
            { value: "Text", label: "Text" },
            { value: "Duration", label: "Duration" },
            { value: "Number", label: "Number" },
            { value: "Date", label: "Date" },
        ],
    },
];


export default getRealFormFields(InitialField);
