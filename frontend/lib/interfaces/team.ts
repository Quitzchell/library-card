export interface Team {
  category: string | null;
  items: Array<Member>;
}

export interface Member {
  region: string | null;
  contact: string;
}

export interface Teams {
  teams: Array<Team>;
}
