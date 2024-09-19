import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { useBack, useCreate, useNavigation, useUpdate } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Address } from "@/types/types";
import { useEffect } from "react";
import GenericForm from "@components/Forms/GenericForm";
import { Button } from "@mui/material";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import { AddressFormFields } from "@components/Forms/Partners/AddressFormFields";
interface AddressFormProps {
  address: Address | null;
  partner_id: string;
}

const AddressForm: React.FC<AddressFormProps> = ({ address, partner_id }) => {
  const { push } = useNavigation();
  const {
    control,
    trigger,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<Address>({
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    const previousAddress = getValues();
    if (address != null) {
      reset({
        address1: address.address1,
        address2: address.address2,
        country: address.country,
        state: address.state,
        city: address.city,
        postal_code: address.postal_code,
        active: address.active
      });
    } else {
      Object.keys(previousAddress).forEach((key) => setValue(key, null));
    }
  }, [open]);

  const { mutate: updateAddress } = useUpdate();
  const { mutate: createAddress } = useCreate();

  const handleSubmit = async () => {
    const isValid = await trigger(); // Triggers validation for all fields

    if (isValid) {
      const payload = getValues();

      if (address) {
        updateAddress(
          {
            resource: `partners/${partner_id}/addresses`,
            id: `${address?.address_id}`,
            values: payload,
          },
          {
            onError: (error) => console.log("error", error),
            onSuccess: () => push(`/dashboard/partners/show?id=${partner_id}`),
          }
        );
      } else {
        createAddress(
          {
            resource: `partners/${partner_id}/addresses`,
            values: payload,
          },
          {
            onError: (error) => console.log("error", error),
            onSuccess: () => push(`/dashboard/partners/show?id=${partner_id}`),
          }
        );
      }
    } else {
      console.log("Validation errors:", errors);
    }
  };
  return (
    <>
      <div className="flex items-center gap-3">
        <div>
          <button
            onClick={useBack()}
            className="inline-block p-2 rounded-xl border duration-500 border-transparent hover:border-black"
          >
            {" "}
            <ArrowIcon />
          </button>
        </div>
        <div className="py-8 !font-satoshi text-2xl font-semibold text-[#1f325c]">
          {address ? "Edit Address" : "Create Address"}
        </div>
      </div>
      {/* {formLoading ? (
        <Loader />
      ) : ( */}
      <>
        <GenericForm
          {...{ control, errors, trigger }}
          setValue={setValue}
          fields={address ? AddressFormFields.edit : AddressFormFields.create}
        />
        <div className="flex justify-end">
          <Button onClick={handleSubmit} sx={sendEmailBtnStyle}>
            Save
          </Button>
        </div>
      </>
      {/* )} */}
    </>
  );
};

export default AddressForm;
