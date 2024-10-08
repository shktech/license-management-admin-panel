import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialField: InitialFieldConfig[] = [
  { name: "start_date", type: "date", required: "text" },
  { name: "end_date", type: "date", required: "text" },
];

export const ReportFormFields = {
  create: getRealFormFields(InitialField),
};
// export default getRealFormFields(InitialField);
