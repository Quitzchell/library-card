import { ContactItem } from "@/lib/interfaces/contact";

type ContactItemProps = {
  contactItem: ContactItem;
};

export default function ContactComponent({ contactItem }: ContactItemProps) {
  return (
    <div className="flex space-x-2 text-white">
      {contactItem.prefix && <p>{contactItem.prefix}:</p>}
      <a
        href={`mailto:${contactItem.contact}`}
        className="text-white hover:underline"
      >
        {contactItem.contact}
      </a>
      {contactItem.postfix && <p>{contactItem.postfix}</p>}
    </div>
  );
}
