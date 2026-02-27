import { Team } from "@/lib/interfaces/team";

export const teamMock = {
  async getTeams(): Promise<Team[]> {
    return [
      {
        category: "Bookings",
        members: [
          {
            region: "NL",
            name: "Roel",
            surname: "Coppen",
            organization: "Friendly Fire",
            email: "r.coppen@friendlyfire.nl",
          },
          {
            region: "BE",
            name: "Björn",
            surname: "Nuyens",
            organization: "Busker",
            email: "bjorn@busker.be",
          },
        ],
      },
    ];
  },
};
