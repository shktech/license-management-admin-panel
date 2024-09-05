import { getRealFormFields } from "@utils/utilFunctions";
import { InitialFieldConfig } from "../InitialFieldConfig";

const InitialCreateField: InitialFieldConfig[] = [
    {
        name: "osc_part_number",
        type: "dropdown",
        size: 2,
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
    },
    {
        name: "start_date",
        type: "date",
    },
    {
        name: "end_date",
        type: "date",
        disabled: true
    },
];

const InitialReActionField: InitialFieldConfig[] = [
    {
        name: "osc_part_number",
        type: "dropdown",
        size: 2,
        disabled: true,
        resource: "products",
        valueKey: "product_part_number",
        labelKey: "product_part_number",
    },
    {
        name: "license_type",
        type: "dropdown",
        disabled: true,
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
    },
    {
        name: "start_date",
        type: "date",
        disabled: true
    },
    {
        name: "end_date",
        type: "date",
        disabled: true
    },
];

export const LicensingDetailFormFields = {
    newAction: getRealFormFields(InitialCreateField),
    notNewAction: getRealFormFields(InitialReActionField),
}
