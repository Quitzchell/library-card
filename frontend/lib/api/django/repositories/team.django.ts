import { Teams } from "@/lib/interfaces/team";

export const teamService = {
  async getTeams(): Promise<Teams> {
    return {
      teams: [
        {
          category: "Bookings",
          items: [
            {
              region: "NL",
              contact: "r.coppen@friendlyfire.nl",
            },
            {
              region: "BE",
              contact: "bjorn@busker.be",
            },
          ],
        },
      ],
    };
  },
};
