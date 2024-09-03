"use client";

import { Contact } from "@/types/types";
import ContactForm from "@components/Partners/ContactForm";
import Loader from "@components/common/Loader";
import { useOne, useParsed } from "@refinedev/core";

const Item = () => {
  const { params } = useParsed();

  const { data, isLoading, error } = useOne({
    resource: `partners/${params?.partner_id}/contacts`,
    id: params?.contact_id as string,
  });

  const contact: Contact = data?.data as Contact;

  return (
    <div className="flex justify-center py-6">
      <div className="w-2/3">
        {isLoading ? (
          <Loader />
        ) : (
          <ContactForm contact={contact} partner_id={params?.partner_id} />
        )}
      </div>
    </div>
  );
};

export default Item;
