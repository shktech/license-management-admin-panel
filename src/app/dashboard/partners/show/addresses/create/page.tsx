"use client";

import AddressForm from "@components/Partners/AddressForm";
import { useParsed } from "@refinedev/core";

const Item = () => {
  const { params } = useParsed();
  return (
    <div className="flex justify-center py-6">
      <div className="w-2/3">
        <AddressForm address={null} partner_id={params?.partner_id} />
      </div>
    </div>
  );
};

export default Item;
