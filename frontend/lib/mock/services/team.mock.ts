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
              name: "r.coppen@friendlyfire.nl",
            },
            {
              region: "BE",
              name: "bjorn@busker.be",
            },
          ],
        },
      ],
    };
  },
};
