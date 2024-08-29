"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { InputTransaction, Product, Transaction } from "@/types/types";
import ProductForm from "@components/Forms/Products/ProductForm";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import { useBack, useList, useParsed } from "@refinedev/core";
import { Edit, SaveButton } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { getDurationFromString } from "@utils/utilFunctions";
import { useEffect, useState } from "react";

const ProductEdit = () => {
    const { params } = useParsed();
    const {
        saveButtonProps,
        refineCore: { formLoading, queryResult },
        control,
        reset,
        trigger,
        watch,
        setValue,
        formState: { errors },
    } = useForm<Product>({
        refineCoreProps: {
            action: "edit",
            resource: "products",
            id: params?.id,
        },
    });

    const product: Product = queryResult?.data?.data as Product;

    useEffect(() => {
        if (!formLoading && product) {
            reset({ ...product });
        }
    }, [formLoading, product]);


    return (
        <Edit
            goBack={
                <button
                    onClick={useBack()}
                    className="inline-block mx-2 p-2 rounded-xl border duration-500 border-transparent hover:border-black"
                >
                    {" "}
                    <ArrowIcon />
                </button>
            }
            canDelete={false}
            title={
                <div className="!font-satoshi text-2xl font-semibold text-[#536175]">
                    Edit Product
                    <div className="text-sm text-[#818f99]">{product?.product_name}</div>
                </div>
            }
            breadcrumb={false}
            headerButtons={<></>}
            wrapperProps={{
                className: "rounded-none bg-[#f2f6fa] shadow-none pt-6 pb-2.5",
            }}
            saveButtonProps={{ ...saveButtonProps, hidden: false }}
            footerButtons={({ saveButtonProps }) => (
                <SaveButton {...saveButtonProps} sx={sendEmailBtnStyle} />
            )}
        >
            {formLoading ? (
                <Loader />
            ) : (
                <div className="px-8">
                    <ProductForm {...{ control, errors, trigger }} />
                </div>
            )}
        </Edit>
    );
};

export default ProductEdit;
