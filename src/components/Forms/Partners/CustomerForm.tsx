import { Customer } from "../../../types/types";
import { GenericFormProps } from "../FormControlWrapper";
import GenericForm from "../GenericForm";
import { InputCustomerFormFields2 } from "./InputCustomerFormFields2";

export type CustomerFormProps = GenericFormProps & {
  customer?: Customer;
};

const CustomerForm = (props: GenericFormProps) => {
  return (
    <div className="flex flex-col">
      <GenericForm {...{ ...props, fields: InputCustomerFormFields2 }} />
    </div>
  );
};

export default CustomerForm;
