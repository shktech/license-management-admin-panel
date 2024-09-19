import { FieldConfig } from "../FormControlWrapper";
import { InputCustomerFormFields } from "./InputCustomerFormFields";

const BillFields: FieldConfig[] = InputCustomerFormFields.map((field) => ({
  name: "bill_" + field.name,
  prefix: "bill_",
  label: "Bill " + field.label,
  placeholder: field.placeholder,
  rules: field.rules,
  type: field.type,
  required: field.required
}));

const ShippingFields: FieldConfig[] = InputCustomerFormFields.map((field) => ({
  name: "ship_" + field.name,
  prefix: "ship_",
  label: "Ship " + field.label,
  placeholder: field.placeholder,
  rules: field.rules,
  type: field.type,
  required: field.required
}));
const ResellerFields: FieldConfig[] = InputCustomerFormFields.map((field) => ({
  name: "reseller_" + field.name,
  prefix: "reseller_",
  label: "Reseller " + field.label,
  placeholder: field.placeholder,
  rules: null,
  type: field.type,
}));

export default {
  BillFields,
  ShippingFields,
  ResellerFields,
};
