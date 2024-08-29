import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
    { name: "value", size: 2 },
    { name: "meaning", size: 2 },
    { name: "attribute1", size: 2 },
    { name: "attribute2", size: 2 },
    { name: "attribute3", size: 2 },
];

export default getRealFormFields(InitialField);
