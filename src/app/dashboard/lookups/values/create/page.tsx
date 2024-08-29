"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { LookupValue, Reference, ReferenceCode } from "@/types/types";
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
            action: "create",
            resource: `lookups/${params?.id}/values`,
        },
    });

    // const referenceCode: ReferenceCode = queryResult?.data?.data as ReferenceCode;

    // useEffect(() => {
    //     if (!formLoading && reference) {
    //         reset({ ...reference });
    //     }
    // }, [formLoading, reference]);


    return (
        <div className="flex justify-center py-4">
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
                            Create Lookup Value
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
                </Create>
            </div>
        </div>
    );
};

export default Item;
