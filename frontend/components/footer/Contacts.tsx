import {
  ContactLists,
  ContactItem,
  ContactList,
} from "@/lib/interfaces/contact";
import { services } from "@/lib/services.config";

export default async function ContactContainer() {
  const contactLists: ContactLists = await services.contact.getContactLists();
  return (
    <div className="flex flex-col">
      {contactLists.lists.map((contactList: ContactList, index: number) => (
        <div key={index}>
          <p className="mb-2 font-bold text-white">{contactList.title}</p>
          {contactList.items.map((contactItem: ContactItem, index: number) => (
            <Contacts key={index} contactItem={contactItem} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Contacts({ contactItem }: { contactItem: ContactItem }) {
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
