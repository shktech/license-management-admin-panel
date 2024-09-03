"use client";

import { Address } from "@/types/types";
import AddressForm from "@components/Partners/AddressForm";
import Loader from "@components/common/Loader";
import { useOne, useParsed } from "@refinedev/core";

const Item = () => {
  const { params } = useParsed();

  const { data, isLoading, error } = useOne({
    resource: `partners/${params?.partner_id}/addresses`,
    id: params?.address_id as string,
  });

  const address: Address = data?.data as Address;

  return (
    <div className="flex justify-center py-6">
      <div className="w-2/3">
        {isLoading ? (
          <Loader />
        ) : (
          <AddressForm address={address} partner_id={params?.partner_id} />
        )}
      </div>
    </div>
  );
};

export default Item;
