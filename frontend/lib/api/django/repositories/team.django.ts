import { Teams } from "@/lib/interfaces/team";

export const teamService = {
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
              org: "Friendly Fire",
              email: "r.coppen@friendlyfire.nl",
            },
            {
              region: "BE",
              name: "Björn",
              surname: "Nuyens",
              org: "Busker",
              email: "bjorn@busker.be",
            },
          ],
        },
      ],
    };
  },
};
