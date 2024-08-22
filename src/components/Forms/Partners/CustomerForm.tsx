import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Customer, Product } from "../../../types/types";
import { GenericFormProps } from "../FormControlWrapper";
import GenericForm from "../GenericForm";
import { InputCustomerFormFields } from './InputCustomerFormFields';
import { InputCustomerFormFields2 } from './InputCustomerFormFields2';

export type CustomerFormProps = GenericFormProps & {
    customer?: Customer;
};

const CustomerForm = (props: GenericFormProps) => {
    return (
        <div className="flex flex-col">
            <GenericForm {...{ ...props, fields: InputCustomerFormFields2 }} />
        </div>
    )
}

export default CustomerForm;