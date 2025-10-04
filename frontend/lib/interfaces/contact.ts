export interface ContactItem {
  prefix: string | null;
  postfix: string | null;
  contact: string;
}

export interface ContactList {
  title: string | null;
  contacts: Array<ContactItem>;
}

export interface ContactListItems {
    items: Array<ContactList>;
} 