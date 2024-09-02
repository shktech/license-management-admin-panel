"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { Contact } from "@/types/types";
import GenericForm from "@components/Forms/GenericForm";
import LookupFormFields from "@components/Forms/Lookups/LookupFormFields";
import AddressFormFields from "@components/Forms/Partners/AddressFormFields";
import ContactFormFields from "@components/Forms/Partners/ContactFormFields";
import ProductForm from "@components/Forms/Products/ProductForm";
import ReferenceFormFields from "@components/Forms/References/ReferenceFormFields";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import { useBack, useParsed } from "@refinedev/core";
import { Create, Edit, SaveButton } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect } from "react";

const Item = () => {
    const { params } = useParsed();
    const {
        saveButtonProps,
        refineCore: { formLoading, queryResult },
        control,
        reset,
        trigger,
        formState: { errors },
    } = useForm<Contact>({
        refineCoreProps: {
            action: "edit",
            resource: `partners/${params?.partner_id}/contacts`,
            id: params?.address_id,
        },
    });
    const contact: Contact = queryResult?.data?.data as Contact;

    useEffect(() => {
        if (!formLoading && contact) {
            reset({ ...contact });
        }
    }, [formLoading, contact]);


    return (
        <div className="flex justify-center py-6">
            <div className='w-2/3'>
                <Create
                    goBack={
                        <button
                            onClick={useBack()}
                            className="inline-block p-2 rounded-xl border duration-500 border-transparent hover:border-black"
                        >
                            {" "}
                            <ArrowIcon />
                        </button>
                    }
                    title={
                        <div className="!font-satoshi text-2xl font-semibold text-[#1f325c]">
                            Create Contact
                        </div>
                    }
                    breadcrumb={false}
                    headerButtons={<></>}
                    wrapperProps={{
                        className: "rounded-none bg-[#f2f6fa] shadow-none",
                    }}
                    saveButtonProps={{ ...saveButtonProps, hidden: false }}
                    footerButtons={({ saveButtonProps }) => (
                        <SaveButton {...saveButtonProps} sx={sendEmailBtnStyle} />
                    )}
                >
                    {formLoading ? (
                        <Loader />
                    ) : (
                        <GenericForm {...{ control, errors, trigger }} fields={ContactFormFields} />
                    )}
                </Create>
            </div>
        </div>
    );
};

export default Item;
