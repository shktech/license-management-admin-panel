import { Organization } from "@/types/types";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import GenericForm from "@components/Forms/GenericForm";
import { modalOkBtnStyle } from "@data/MuiStyles";
import { Button } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { OrganizationEditFormFields } from "@components/Forms/Organizations/OrganizationFormFields";
import { useEffect, useState } from "react";
import { useUpdate } from "@refinedev/core";

interface OrganizationComponentProps {
  organization: Organization;
  enableSave: boolean;
}

const OrganizationComponent: React.FC<OrganizationComponentProps> = ({
  organization,
  enableSave,
}) => {
  const {
    handleSubmit,
    control,
    trigger,
    reset,
    formState: { errors },
  } = useForm<Organization>();
  const [fields, setFields] = useState(OrganizationEditFormFields);
  const { mutate } = useUpdate();

  useEffect(() => {
    reset({ ...organization });
  }, [organization]);

  useEffect(() => {
    if (!enableSave) {
      const updatedFields = OrganizationEditFormFields.map((field) => ({
        ...field,
        disabled: true,
      }));
      setFields(updatedFields);
    }
  }, [enableSave]);

  const onSubmit = (data: any) => {
    mutate({
        resource: "orgs",
        id: `${organization?.organization_code}`,
        values: data,
    })
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={
          <ArrowForwardIosSharpIcon
            sx={{ fontSize: "0.9rem", color: "#536175" }}
          />
        }
      >
        <CorporateFareIcon />
        <div className="pl-2 text-md font-medium">
          {organization?.organization_name}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleSubmit(onSubmit)}>
          <GenericForm {...{ control, errors, trigger, fields }}></GenericForm>
          {enableSave && (
            <div className="flex justify-end gap-4">
              <Button type="submit" variant="contained" sx={modalOkBtnStyle}>
                Save
              </Button>
            </div>
          )}
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default OrganizationComponent;
