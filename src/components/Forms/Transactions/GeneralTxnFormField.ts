import { InitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields } from "@utils/utilFunctions";

const InitialCreateField: InitialFieldConfig[] = [
  {
    name: "transaction_source",
    type: "dropdown",
    size: 2,
    required: "text",
    options: [
      { value: "Oracle ERP", label: "Oracle ERP" },
      { value: "Prod Reg", label: "Prod Reg" },
      { value: "Manual", label: "Manual" },
    ],
  },
  {
    name: "transaction_action",
    type: "dropdown",
    disabled: true,
    required: "text",
    options: [
      { value: "New", label: "New" },
      { value: "Renewal", label: "Renewal" },
      { value: "Revoke", label: "Revoke" },
    ],
  },
  { name: "source_reference_number" },
  { name: "source_reference_date", type: "date" },
  { name: "source_reference_id" },
];

const InitialEditField: InitialFieldConfig[] = [
  {
    name: "transaction_source",
    type: "dropdown",
    size: 2,
    disabled: true,
    required: "text",
    options: [
      { value: "Oracle ERP", label: "Oracle ERP" },
      { value: "Prod Reg", label: "Prod Reg" },
      { value: "Manual", label: "Manual" },
    ],
  },
  {
    name: "transaction_action",
    type: "dropdown",
    disabled: true,
    required: "text",
    options: [
      { value: "New", label: "New" },
      { value: "Renewal", label: "Renewal" },
      { value: "Revoke", label: "Revoke" },
    ],
  },
  { name: "source_reference_number" },
  { name: "source_reference_date", type: "date" },
  { name: "source_reference_id" },
];

export default {
  CreateTransactionForm: {
    newAction: getRealFormFields(InitialCreateField),
    notNewAction: getRealFormFields([
      ...InitialCreateField,
      { name: "license_key", size: 2, disabled: true },
    ]),
  },
  EditTransactionForm: getRealFormFields([
    ...InitialEditField,
    { name: "license_key", size: 2, disabled: true },
  ]),
};
