"use client";
import { User } from "@/types/types";
import MemeberPanel from "@components/Organizations/MemeberPanel";
import OrganizationComponent from "@components/Organizations/OrganizationComponent";
import RolePanel from "@components/Organizations/RolePanel";
import APIKeyPanel from "@components/Profile/APIKeyPanel";
import {
  CustomTabPanel,
  StyledTab,
  StyledTabs,
} from "@components/Tab/CustomizedTab";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetIdentity } from "@refinedev/core";
import { useState } from "react";

const Page = () => {
  const { data: identity } = useGetIdentity<User>();

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col">
      <div className="!font-satoshi px-12 pt-10 pb-4 text-2xl font-semibold text-[#1f325c] flex items-end gap-2">
        <FontAwesomeIcon icon={faUserGroup} />
        Organization
        <span className="text-base text-[#11ba82]">
          {identity?.organization}
        </span>
      </div>
      <div className="px-12">
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <StyledTab label="Roles and Permissions" />
          <StyledTab label="API Keys" />
          <StyledTab label="Notifications" />
          <StyledTab label="Members" />
          <StyledTab label="Organizations" />
        </StyledTabs>
      </div>
      <CustomTabPanel value={value} index={0}>
        <RolePanel />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <APIKeyPanel />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <RolePanel />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <MemeberPanel />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <OrganizationComponent />
      </CustomTabPanel>
    </div>
  );
};

export default Page;
