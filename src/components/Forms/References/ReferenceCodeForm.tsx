import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Reference, ReferenceCode } from "../../../types/types";
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
    )
}

export default ReferenceCodeForm;