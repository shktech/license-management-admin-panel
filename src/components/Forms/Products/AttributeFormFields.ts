import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
    { name: "attribute1" },
    { name: "attribute2" },
    { name: "attribute3" },
    { name: "attribute4" },
    { name: "attribute5" },
];

export default getRealFormFields(InitialField);
