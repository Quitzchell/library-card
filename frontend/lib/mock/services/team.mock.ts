import { Teams } from "@/lib/interfaces/team";

export const teamMock = {
  async getTeams(): Promise<Teams> {
    return {
      teams: [
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
      ],
    };
  },
};
