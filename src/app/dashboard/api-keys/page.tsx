"use client";
import React, { useMemo } from "react";
import { useNavigation, usePermissions, useTable } from "@refinedev/core";
import { Permission, Role } from "@/types/types";
import { MRT_ColumnDef } from "material-react-table";
import Loader from "@components/common/Loader";
import CommonTable from "@components/Table/CommonTable";
import { RoleColors } from "@data/ColorData";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RoleDrawer from "@components/Role/RoleDrawer";
import Unauthorized from "@components/Error/Unauthorized";
import GenericTable from "@components/Table/GenericTable";

const Page = () => {
  return (
    <div className="!font-satoshi px-12 py-10 text-2xl font-semibold text-[#1f325c] flex items-center gap-2">
      <h1>API Keys</h1>
    </div>
  );
};

export default Page;
