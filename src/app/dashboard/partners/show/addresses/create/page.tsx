"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { Address } from "@/types/types";
import GenericForm from "@components/Forms/GenericForm";
import LookupFormFields from "@components/Forms/Lookups/LookupFormFields";
import AddressFormFields from "@components/Forms/Partners/AddressFormFields";
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
    } = useForm<Address>({
        refineCoreProps: {
            action: "edit",
            resource: `partners/${params?.partner_id}/addresses`,
            id: params?.address_id,
        },
    });
    const address: Address = queryResult?.data?.data as Address;

    useEffect(() => {
        if (!formLoading && address) {
            reset({ ...address });
        }
    }, [formLoading, address]);


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
                        <div className="!font-satoshi text-2xl font-semibold text-[#536175]">
                            Create Address
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
                        <GenericForm {...{ control, errors, trigger }} fields={AddressFormFields} />
                    )}
                </Create>
            </div>
        </div>
    );
};

export default Item;
