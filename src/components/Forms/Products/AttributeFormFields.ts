import { SecondInitialFieldConfig } from "../InitialFieldConfig";
import { getSecondRealFormFields } from "@utils/utilFunctions";

const InitialField: SecondInitialFieldConfig[] = [
    { name: "attribute1" },
    { name: "attribute2" },
    { name: "attribute3" },
    { name: "attribute4" },
    { name: "attribute5" },
];

export default getSecondRealFormFields(InitialField);
