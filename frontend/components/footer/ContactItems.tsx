import {
  ContactLists,
  ContactItem,
  ContactList,
} from "@/lib/interfaces/contact";
import { services } from "@/lib/services.config";

export default async function ContactListContainer() {
  const contactListItems: ContactLists = await services.contact.getContactLists();
  return (
    <div className="flex flex-col">
      {contactListItems.lists.map(
        (contactList: ContactList, index: number) => (
          <div key={index}>
            <p className="mb-2 font-bold text-white">{contactList.title}</p>
            <Contacts contactList={contactList} />
          </div>
        ),
      )}
    </div>
  );
}

function Contacts({ contactList: contactList }: { contactList : ContactList}) {
  return (
    <>
      {contactList.items.map(
        (contactItem: ContactItem, index: number) => (
          <div className="flex space-x-2 text-white" key={index}>
            {contactItem.prefix && <p>{contactItem.prefix}:</p>}
            <a
              href={`mailto:${contactItem.contact}`}
              className="text-white hover:underline"
            >
              {contactItem.contact}
            </a>
            {contactItem.postfix && <p>{contactItem.postfix}</p>}
          </div>
        ),
      )}
    </>
  );
}
