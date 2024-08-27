import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
    { name: "code" },
    { name: "meaning" },
    { name: "description" },
    { name: "tag" },
    { name: "active", type: "switch" },
];

export default getRealFormFields(InitialField);
