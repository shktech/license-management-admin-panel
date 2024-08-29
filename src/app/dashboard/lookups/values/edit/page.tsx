"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { Reference, LookupValue } from "@/types/types";
import GenericForm from "@components/Forms/GenericForm";
import LookupValueFields from "@components/Forms/Lookups/LookupValueFields";
import ProductForm from "@components/Forms/Products/ProductForm";
import ReferenceCodeFormFields from "@components/Forms/References/ReferenceCodeFormFields";
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
    } = useForm<LookupValue>({
        refineCoreProps: {
            action: "edit",
            resource: `lookups/${params?.lookup_id}/values`,
            id: params?.code_id
        },
    });

    const lookupValue: LookupValue = queryResult?.data?.data as LookupValue;

    useEffect(() => {
        if (!formLoading && lookupValue) {
            reset({ ...lookupValue });
        }
    }, [formLoading, lookupValue]);


    return (
        <div className="flex justify-center py-4">
            <div className='w-2/3'>
                <Edit
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
                            Create Reference Code
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
                        <GenericForm {...{ control, errors, trigger }} fields={LookupValueFields} />
                    )}
                </Edit>
            </div>
        </div>
    );
};

export default Item;
