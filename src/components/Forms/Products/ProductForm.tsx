import { Product } from "../../../types/types";
import { GenericFormProps } from "../FormControlWrapper";
import ProductFormFields from "./ProductFormFields";
import GenericForm from "../GenericForm";

export type ProductFormProps = GenericFormProps & {
    product?: Product;
};

const ProductForm = (props: GenericFormProps) => {
    return (
        <div className="flex flex-col gap-6">
            <GenericForm {...{ ...props, fields: ProductFormFields }} />
        </div>
    )
}

export default ProductForm;