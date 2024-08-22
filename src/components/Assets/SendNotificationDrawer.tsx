import React, { useState } from 'react';
import { Button, Collapse, Drawer, FormControl, FormControlLabel, InputLabel, MenuItem, outlinedInputClasses, Radio, RadioGroup, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useList, useOne } from '@refinedev/core';
import { EmailTemplate, Transaction } from '../../types/types';
import ShowTransaction from '@components/Transactions/Show/ShowTransaction';
import Loader from '@components/common/Loader';
import { IOSSwitch } from '@components/Input/GeneralSwitch';
import { modalOkBtnStyle, outlineBtnStyle } from '@data/MuiStyles';

interface SendNotificationDrawerProps {
  license_key: string | undefined;
}


const SendNotificationDrawer: React.FC<SendNotificationDrawerProps> = ({ license_key }) => {

  const { data, refetch, isLoading } = useList<EmailTemplate>({
    resource: "email-templates",
    hasPagination: false,
  });

  const [openDrawer, setOpenDrawer] = useState(false);

  const [type, setType] = useState<any>(0);

  const emailTemplateData: EmailTemplate[] = data?.data as EmailTemplate[];

  const [changePassword, setChangePassword] = useState(false);

  const handleShowDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  }

  const getReplacedEmailContent = (emailContent: any) => {
    return emailContent.replace('{license_keys}', license_key);
  }

  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value)
  };

  return (
    <div className='px-10'>
      <Button onClick={handleShowDrawer} sx={outlineBtnStyle}>Send Notification</Button>
      <Drawer anchor="right" open={openDrawer} onClose={handleCloseDrawer}>
        <div className="min-w-[700px] pb-4 flex flex-col min-h-screen">
          {
            isLoading ? <Loader /> :
              <div>
                <div className="px-8 py-4 flex-1 bg-white rounded-xl flex flex-col gap-4">
                  <div className='text-xl font-semibold text-[#515f72]'>Send Notification</div>
                  <div className='grid grid-cols-6 items-center gap-6'>
                    <div className=''>From :</div>
                    <div className='col-span-5'>
                      <TextField
                        hiddenLabel
                        fullWidth
                        value={emailTemplateData[type].from_email}
                        id="filled-hidden-label-small"
                        size="small"
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-6 items-center gap-6'>
                    <div className=''>To :</div>
                    <div className='col-span-5'>
                      <TextField
                        hiddenLabel
                        fullWidth
                        placeholder='Please enter the receiver email i.g. john@gmail.com'
                        id="filled-hidden-label-small"
                        size="small"
                        required
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-6 items-center gap-6'>
                    <div className=''>Subject :</div>
                    <div className='col-span-5'>
                      <FormControl fullWidth>
                        <Select
                          displayEmpty
                          id="demo-simple-select"
                          size='small'
                          value={type}
                          onChange={handleChangeType}
                        >
                          {
                            emailTemplateData.map((et, i) => (
                              <MenuItem value={i}>{et.subject}</MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className='mt-4 border border-[#c4c4c4] rounded-md p-4'>
                    <div dangerouslySetInnerHTML={{ __html: getReplacedEmailContent(emailTemplateData[type].body) }} />
                  </div>
                  <div className='flex justify-end'>
                    <Button
                      sx={modalOkBtnStyle}
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </div>
          }
        </div>
      </Drawer>
    </div>
  );
};

export default SendNotificationDrawer;
