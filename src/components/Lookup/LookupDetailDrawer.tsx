import React, { useEffect } from 'react';
import { Button, Drawer, IconButton } from '@mui/material';
import { useCreate, useDelete, useUpdate } from '@refinedev/core';
import { useForm } from "@refinedev/react-hook-form";
import { modalCancelBtnStyle, modalOkBtnStyle } from "@data/MuiStyles";
import { Lookup } from '../../types/types';
import ProductForm from '@components/Forms/Products/ProductForm';
import LookupForm from '@components/Forms/Lookups/LookupForm';

interface LookupDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  lookup: Lookup | null
}

const LookupDetailDrawer: React.FC<LookupDetailDrawerProps> = ({ open, onClose, lookup }) => {
  const {
    control,
    trigger,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<Lookup>();

  useEffect(() => {
    const previousProduct = getValues();
    if (lookup != null) {
      reset(lookup);
    } else {
      Object.keys(previousProduct).forEach(key => setValue(key, null))
    }
  }, [open]);

  const { mutate: updateLookup } = useUpdate();
  const { mutate: createLookup } = useCreate();

  const handleSubmit = async () => {
    const isValid = await trigger(); // Triggers validation for all fields

    if (isValid) {
      const handleError = (error: any) => {

      };

      const lookupData = getValues();

      if (lookup) {
        // updateLookup(
        //   {
        //     resource: "lookups",
        //     id: `${(lookup?.code)}`,
        //     values: lookupData
        //   },
        //   {
        //     onError: handleError,
        //     onSuccess: () => onClose(),
        //   }
        // )
      } else {
        // createLookup(
        //   {
        //     resource: "products",
        //     values: lookupData
        //   },
        //   {
        //     onError: handleError,
        //     onSuccess: () => onClose(),
        //   }
        // );
      }
    } else {
      console.log('Validation errors:', errors);
    }
  };
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="min-w-[700px] px-4 pb-4 flex flex-col min-h-screen">
        <div className="py-4 px-2 text-lg font-bold text-[#65758c] flex items-center">
          Detail Information
        </div>
        <div className='flex-1'>
          <LookupForm
            {...{ control, errors, trigger }}
          />
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
            {lookup ? "Save" : "Create"}
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default LookupDetailDrawer;
