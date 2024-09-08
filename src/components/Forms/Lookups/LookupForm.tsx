import { Lookup } from "../../../types/types";
import { GenericFormProps } from "../FormControlWrapper";
import GenericForm from "../GenericForm";
import LookupFormFields from "./LookupFormFields";

export type LookupFormProps = GenericFormProps & {
  lookup?: Lookup;
};

const LookupForm = (props: GenericFormProps) => {
  return (
    <div className="flex flex-col">
      <div className="px-4">
        <GenericForm {...{ ...props, fields: LookupFormFields }} />
      </div>
    </div>
  );
};

export default LookupForm;
