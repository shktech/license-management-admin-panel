import { Product } from "../../../types/types";
import { GenericFormProps } from "../FormControlWrapper";
import ProductFormFields from "./MainInformationFormFields";
import GenericForm from "../GenericForm";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import MainInformationFormFields from "./MainInformationFormFields";
import AttributeFormFields from "./AttributeFormFields";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

export type ProductFormProps = GenericFormProps & {
    product?: Product;
};

const ProductForm = (props: GenericFormProps) => {
    const FormGroups = [
        {
            title: 'Main Information',
            fields: MainInformationFormFields
        },
        {
            title: 'Attributes',
            fields: AttributeFormFields
        },
    ]
    return (
        <div className="flex flex-col">
            {/* <GenericForm {...{ ...props, fields: ProductFormFields }} /> */}
            {
                FormGroups.map((formGroup, i) => (
                    <Accordion
                        key={i}
                        elevation={0}
                        disableGutters
                        defaultExpanded={i == 0}
                        sx={{
                            borderBottom: '1px solid #d7dde4',
                            border: i + 1 == FormGroups.length ? '0' : '1',
                            '&::before': { display: 'none' },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: '#536175' }} />}
                            aria-controls="panel1-content"
                            id={formGroup.title}
                            sx={{
                                flexDirection: 'row-reverse',
                                color: '#536175',
                                transitionDuration: '500ms',
                                "&:hover": {
                                    color: "#003133", // Light grey background on hover
                                },
                                '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                                    transform: 'rotate(90deg)',
                                },
                            }}
                        >
                            <div className="pl-2 text-md font-medium">{formGroup.title}</div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="px-4">
                                <GenericForm {...{ ...props, fields: formGroup.fields }} />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </div>
    )
}

export default ProductForm;