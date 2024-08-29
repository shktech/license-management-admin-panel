import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
    { name: "lookup_name", size: 2 },
    { name: "description", size: 2 },
];

export default getRealFormFields(InitialField);
