import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
    { name: "reference_name", size: 2 },
    { name: "reference_description", size: 2 },
    { name: "reference_type", size: 2 },
];

export default getRealFormFields(InitialField);
