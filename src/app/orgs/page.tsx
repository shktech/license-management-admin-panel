"use client";

import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { HttpError, useGetIdentity, useList } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Organization, User } from "@/types/types";
import GenericForm from "@components/Forms/GenericForm";
import { OrganizationEditFormFields } from "@components/Forms/Organizations/OrganizationFormFields";
import { useEffect, useState } from "react";
import { tableAddButton } from "@data/MuiStyles";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { modalOkBtnStyle } from "@data/MuiStyles";
import OrganizationDetailDrawer from "@components/Organizations/OrganizationDrawer";
import OrganizationComponent from "@components/Organizations/OrganizationComponent";

const Page = () => {
  const { data: identity, isLoading: isIdentityLoading } =
    useGetIdentity<User>();
  const {
    data: orgs,
    isLoading,
    refetch,
  } = useList<Organization, HttpError>({
    resource: "orgs",
    hasPagination: false,
  });

  useEffect(() => {
    if (identity && orgs) {
      const currentOrg = orgs.data?.find(
        (org) => org.organization_code === identity.organization
      );
      const otherOrgs = orgs.data?.filter(
        (org) => org.organization_code !== identity.organization
      );
      setCurrentOrg(currentOrg as Organization);
      setOtherOrgs(otherOrgs);
    }
  }, [identity, orgs]);

  useEffect(() => {
    setLoading(isIdentityLoading || isLoading);
  }, [isIdentityLoading, isLoading]);

  const [currentOrg, setCurrentOrg] = useState<Organization | null>(null);
  const [otherOrgs, setOtherOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleClose = () => {
    refetch();
    setOpenDrawer(false);
  };

  return (
    <div>
      <div className="flex flex-row gap-4 items-center px-12 py-8">
        <div className="text-2xl font-semibold">Org Management</div>
      </div>
      <div className="flex justify-center">
        <div className="w-2/3 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <div className="text-lg font-semibold">Organizations</div>
              <div className="text-sm">
                The organizations that are associated with your account
              </div>
            </div>
            <Button onClick={() => setOpenDrawer(true)} sx={tableAddButton}>
              <AddIcon /> {"Create an Organization"}
            </Button>
          </div>
          {([currentOrg, ...otherOrgs] as Organization[]).map(
            (org: Organization, i: number) => (
              <OrganizationComponent organization={org} enableSave={i === 0} />
            )
          )}
        </div>
      </div>
      <OrganizationDetailDrawer open={openDrawer} onClose={handleClose} />
    </div>
  );
};

export default Page;
