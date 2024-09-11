import { FieldConfig } from "../FormControlWrapper";
import { InputCustomerFormFields } from "./InputCustomerFormFields";

const BillFields: FieldConfig[] = InputCustomerFormFields.map((field) => ({
  name: "bill_" + field.name,
  label: "Bill " + field.label,
  placeholder: field.placeholder,
  rules: field.rules,
  type: field.type,
}));

const ShippingFields: FieldConfig[] = InputCustomerFormFields.map((field) => ({
  name: "ship_" + field.name,
  label: "Ship " + field.label,
  placeholder: field.placeholder,
  rules: field.rules,
  type: field.type,
}));
const ResellerFields: FieldConfig[] = InputCustomerFormFields.map((field) => ({
  name: "reseller_" + field.name,
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
