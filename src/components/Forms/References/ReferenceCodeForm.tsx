import { ReferenceCode } from "../../../types/types";
import { GenericFormProps } from "../FormControlWrapper";
import GenericForm from "../GenericForm";

export type ReferenceCodeFormProps = GenericFormProps & {
  referenceCode?: ReferenceCode;
};

const ReferenceCodeForm = (props: GenericFormProps) => {
  return (
    <div className="px-4">
    </div>
  );
};

export default ReferenceCodeForm;
