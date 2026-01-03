import {
  ContactLists,
  ContactItem,
  ContactList,
} from "@/lib/interfaces/contact";
import { services } from "@/lib/services.config";
import ContactComponent from "@/components/footer/ContactComponent";

export default async function ContactContainer() {
  const contactLists: ContactLists = await services.contact.getContactLists();

  return (
    <div className="flex flex-col">
      {contactLists.lists.map((contactList: ContactList, index: number) => (
        <div key={index}>
          <p className="mb-2 font-bold text-white">{contactList.title}</p>
          {contactList.items.map((contactItem: ContactItem, index: number) => (
            <ContactComponent key={index} contactItem={contactItem} />
          ))}
        </div>
      ))}
    </div>
  );
}
