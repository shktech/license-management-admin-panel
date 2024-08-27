"use client";
import CommonTable from "@components/Table/CommonTable";
import { Lookup } from "../../../types/types";
import { MRT_ColumnDef } from "material-react-table";
import React, { useMemo, useState } from "react";
import { CustomTabPanel, StyledTab, StyledTabs } from "@components/Tab/CustomizedTab";
import LookupDetailDrawer from "@components/Lookup/LookupDetailDrawer";
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const durationData: Lookup[] = [
  {
    code: 'EA',
    meaning: 'Same',
    description: 'Same',
    tag: 'EA',
    active: true,
  },
  {
    code: '1YR',
    meaning: '1 Year',
    description: '1 Year',
    tag: '1YR',
    active: true,
  },
  {
    code: '2YR',
    meaning: '2 Year',
    description: '2 Year',
    tag: '2YR',
    active: true,
  },
  {
    code: '3YR',
    meaning: '3 Year',
    description: '3 Year',
    tag: '3YR',
    active: true,
  },
];

const HomePage: React.FC = () => {

  const [value, setValue] = useState(0);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [clickedLookup, setClickedLookup] = React.useState<Lookup | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCreate = () => setOpenDrawer(true);
  const handleEditClick = (row: Lookup) => {
    setClickedLookup(row);
    setOpenDrawer(true);
  };
  const handleClose = () => {
    // refetch();
    setClickedLookup(null);
    setOpenDrawer(false);
  }

  const handleDeleteBtn = (lookup: Lookup) => {
    // handleOpenDeleteModal();
    setClickedLookup(lookup);
  }

  const columns = useMemo<MRT_ColumnDef<Lookup>[]>(
    () => [
      {
        accessorKey: "code",
        header: "Code",
        size: 50,
      },
      {
        accessorKey: "meaning",
        header: "Meaning",
        size: 50,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 50,
      },
      {
        accessorKey: "tag",
        header: "Tag",
        size: 50,
      },
      {
        accessorKey: "active",
        header: "Active",
        size: 50,
        Cell: ({ renderedCellValue }) => <div className={`rounded-full h-4 w-4 ${renderedCellValue ? 'bg-[#11ba82]' : 'bg-[#929ea8]'}`}></div>
      },
      {
        accessorKey: "actions",
        header: "Action",
        size: 100,
        enableSorting: false,
        pin: 'right',
        Cell: ({ row }) => (
          <div className="w-full h-full">
            <div className="flex gap-4">
              <EditOutlinedIcon onClick={() => handleEditClick(row.original)} fontSize="small" className="text-[#818f99] hover:text-black cursor-pointer" />
              <DeleteIcon onClick={() => handleDeleteBtn(row.original)} fontSize="small" className="text-[#818f99] hover:text-black cursor-pointer" />
            </div>
          </div>
        ),
      },
    ],
    []
  );
  return (
    <div className="pt-6 pb-2.5 xl:pb-1 overflow-x-auto">
      <div className="px-12 py-4 !font-satoshi text-2xl font-semibold text-[#515f72] gap-2">
        Lookups
      </div>
      <div className="px-12 pt-4">
        <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <StyledTab label="Duration" />
          <StyledTab label="Vendor" />
        </StyledTabs>
      </div>
      <CustomTabPanel value={value} index={0}>
        <CommonTable
          title={
            <div className="flex gap-4 items-end">
              <div className="text-lg font-semibold">Values</div>
            </div>
          }
          data={durationData}
          columns={columns}
          canCreate={true}
          handleCreate={handleCreate}
        />
      </CustomTabPanel>
      <LookupDetailDrawer
        open={openDrawer}
        onClose={() => handleClose()}
        lookup={clickedLookup}
      />
    </div>
  );
};

export default HomePage;
