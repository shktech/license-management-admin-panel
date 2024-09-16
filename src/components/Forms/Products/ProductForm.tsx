import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Product } from "../../../types/types";
import { GenericFormProps } from "../FormControlWrapper";
import GenericForm from "../GenericForm";
import AttributeFormFields from "./AttributeFormFields";
import { MainInformationFormFields } from "./MainInformationFormFields";

export type ProductFormProps = GenericFormProps & {
  product?: Product;
  watch?: any;
};

const ProductForm = (props: ProductFormProps) => {
  console.log(props.product);
  const FormGroups = [
    {
      title: "Main Information",
      fields: props.product ? MainInformationFormFields.edit : MainInformationFormFields.create,
    },
    {
      title: "Attributes",
      fields: AttributeFormFields,
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      {FormGroups.map((formGroup, i) => (
        <Accordion
          key={i}
          // elevation={0}
          // disableGutters
          defaultExpanded={i == 0}
          sx={{
            borderTop: "2px solid #1f325c",
            "&::before": { display: "none" },
            borderRadius: "0.5rem",
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);",
          }}
        >
          <AccordionSummary
            expandIcon={
              <ArrowForwardIosSharpIcon
                sx={{ fontSize: "0.9rem", color: "#536175" }}
              />
            }
            aria-controls="panel1-content"
            id={formGroup.title}
            sx={{
              py: 1,
              flexDirection: "row-reverse",
              color: "#536175",
              transitionDuration: "500ms",
              "&:hover": {
                color: "#003133",
              },
              "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                transform: "rotate(90deg)",
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
      ))}
    </div>
  );
};

export default ProductForm;
