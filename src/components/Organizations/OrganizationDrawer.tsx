import React from "react";
import { Button, Drawer } from "@mui/material";
import { useCreate } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { modalCancelBtnStyle, modalOkBtnStyle } from "@data/MuiStyles";
import { Organization } from "@/types/types";
import { OrganizationCreateFormFields } from "@components/Forms/Organizations/OrganizationFormFields";
import GenericForm from "@components/Forms/GenericForm";

interface OrganizationDetailDrawerProps {
  open: boolean;
  onClose: () => void;
}

const OrganizationDetailDrawer: React.FC<OrganizationDetailDrawerProps> = ({
  open,
  onClose,
}) => {
  const {
    control,
    trigger,
    formState: { errors },
    getValues,
  } = useForm<Organization>();

  const { mutate } = useCreate();
  const fields = OrganizationCreateFormFields;

  const handleSubmit = async () => {
    const isValid = await trigger();

    if (isValid) {
      const orgData = getValues();
      mutate(
        {
          resource: "orgs",
          values: orgData,
        },
        {
          onSuccess: () => onClose(),
        }
      );
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="min-w-[700px] px-4 pb-4 flex flex-col min-h-screen">
        <div className="py-4 px-2 text-lg font-bold text-[#65758c] flex items-center">
          Detail Information
        </div>
        <div className="flex-1">
          <GenericForm {...{ control, errors, trigger, fields }}></GenericForm>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            variant="contained"
            onClick={onClose}
            sx={modalCancelBtnStyle}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={modalOkBtnStyle}
          >
            {"Create"}
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default OrganizationDetailDrawer;
