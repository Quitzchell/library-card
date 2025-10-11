export interface ContactItem {
  prefix: string | null;
  postfix: string | null;
  contact: string;
}

export interface ContactList {
  title: string | null;
  items: Array<ContactItem>;
}

export interface ContactLists {
    lists: Array<ContactList>;
} 