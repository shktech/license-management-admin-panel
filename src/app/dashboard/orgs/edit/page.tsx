"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { Organization, Product } from "@/types/types";
import GenericForm from "@components/Forms/GenericForm";
import { OrganizationEditFormFields } from "@components/Forms/Organizations/OrganizationFormFields";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import { useBack, useParsed } from "@refinedev/core";
import { Edit, SaveButton } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect } from "react";

const Item = () => {
    const { params } = useParsed();
    const {
        saveButtonProps,
        refineCore: { formLoading, queryResult },
        control,
        trigger,
        reset,
        formState: { errors },
    } = useForm<Organization>({
        refineCoreProps: {
            action: "edit",
            resource: "orgs",
            id: params?.organization_code,
        },
    });

    const org: Organization = queryResult?.data?.data as Organization;

    useEffect(() => {
        if (!formLoading && org) {
            reset({ ...org });
        }
    }, [formLoading, org]);

    return (
        <div className="flex justify-center py-4">
            <div className='w-2/3'>
                <Edit
                    goBack={<button onClick={useBack()} className="inline-block p-2 rounded-xl border duration-500 border-transparent hover:border-black"> <ArrowIcon /></button>}
                    breadcrumb={false}
                    headerButtons={<></>}
                    title={
                        <div className="!font-satoshi text-2xl font-semibold text-[#536175] flex items-center">
                            Edit Organization
                        </div>
                    }
                    saveButtonProps={{ ...saveButtonProps, hidden: false }}
                    footerButtons={({ saveButtonProps }) => (
                        <SaveButton {...saveButtonProps} sx={sendEmailBtnStyle} />
                    )}
                    wrapperProps={{
                        className: "rounded-none bg-[#f2f6fa] shadow-none",
                    }}
                >
                    {formLoading ? (
                        <Loader />
                    ) : (
                        <GenericForm {...{ control, errors, trigger }} fields={OrganizationEditFormFields} />
                    )}
                </Edit>
            </div>
        </div>
    );
};

export default Item;