import React, { useEffect } from "react";
import { Button, Drawer } from "@mui/material";
import { useCreate, useUpdate } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { modalCancelBtnStyle, modalOkBtnStyle } from "@data/MuiStyles";
import { Organization } from "@/types/types";
import { OrganizationCreateFormFields, OrganizationEditFormFields } from "@components/Forms/Organizations/OrganizationFormFields";
import GenericForm from "@components/Forms/GenericForm";

interface OrganizationDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  org: Organization | null
}

const OrganizationDetailDrawer: React.FC<OrganizationDetailDrawerProps> = ({
  open,
  onClose,
  org
}) => {
  const {
    control,
    trigger,
    formState: { errors },
    getValues,
    setValue,
    reset
  } = useForm<Organization>();

  useEffect(() => {
    if (org != null) {
      reset(org);
    } else {
      reset({});
    }
  }, [open]);

  const { mutate: createOrg } = useCreate();
  const { mutate: updateOrg } = useUpdate();
  const fields = org ? OrganizationEditFormFields : OrganizationCreateFormFields;

  const handleSubmit = async () => {
    const isValid = await trigger();
    console.log(fields);
    if (isValid) {

      const handleError = (error: any) => {

      };

      const orgData = getValues();

      console.log(orgData);
      if (org) {
        updateOrg(
          {
            resource: "products",
            id: `${(org?.organization_code)}`,
            values: orgData
          },
          {
            onError: handleError,
            onSuccess: () => onClose(),
          }
        )
      } else {
        createOrg(
          {
            resource: "orgs",
            values: orgData,
          },
          {
            onError: handleError,
            onSuccess: () => onClose(),
          }
        );
      }

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
            {org ? "Save" : "Create"}
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default OrganizationDetailDrawer;
