"use client";

import ContactForm from "@components/Partners/ContactForm";
import { useParsed } from "@refinedev/core";
const Item = () => {
  const { params } = useParsed();
  return (
    <div className="flex justify-center py-6">
      <div className="w-2/3">
        <ContactForm contact={null} partner_id={params?.partner_id} />
      </div>
    </div>
  );
};

export default Item;
