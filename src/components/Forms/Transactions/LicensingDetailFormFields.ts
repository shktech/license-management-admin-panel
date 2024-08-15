import { FieldConfig } from "../FormControlWrapper";
import { useFetchOptions } from "@/hooks/useFetchOptions";
import { InitialFieldConfig, SecondInitialFieldConfig } from "../InitialFieldConfig";
import { getRealFormFields, getSecondRealFormFields } from "@utils/utilFunctions";

const InitialField: SecondInitialFieldConfig[] = [
    {
        name: "osc_part_number",
        type: "dropdown",
        size: 2,
        required: 'text',
        resource: "products",
        valueKey: "product_part_number",
        labelKey: "product_part_number",
    },
    {
        name: "license_type",
        type: "dropdown",
        size: 1,
        options: [
            { value: "Eval", label: "Eval" },
            { value: "Subscription", label: "Subscription" },
            { value: "NFR", label: "NFR" },
            { value: "Promotion", label: "Promotion" },
        ],
    },
    {
        name: "quantity",
        type: "number",
        required: 'text',
    },
    {
        name: "start_date",
        required: 'text',
        type: "date",
    },
    {
        name: "end_date",
        type: "date",
        required: 'text',
    },
    {
        name: "waybill_number",
        size: 2,
    },
    {
        name: "return_waybill_number",
        size: 2,
    },
];

export const LicensingDetailFormFields = getSecondRealFormFields(InitialField);
