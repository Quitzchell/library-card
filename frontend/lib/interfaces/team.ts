export interface Team {
  category: string | null;
  members: Array<Member>;
}

export interface Member {
  region: string | null;
  name: string;
  email: string;
}

export interface Teams {
  teams: Array<Team>;
}
