import { ReferenceCode } from "../../../types/types";
import { GenericFormProps } from "../FormControlWrapper";
import GenericForm from "../GenericForm";
import ReferenceCodeFormFields from "./ReferenceCodeFormFields";

export type ReferenceCodeFormProps = GenericFormProps & {
  referenceCode?: ReferenceCode;
};

const ReferenceCodeForm = (props: GenericFormProps) => {
  return (
    <div className="px-4">
      <GenericForm {...{ ...props, fields: ReferenceCodeFormFields }} />
    </div>
  );
};

export default ReferenceCodeForm;
