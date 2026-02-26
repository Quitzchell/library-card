import { Teams, Member, Team } from "@/lib/interfaces/team";
import { services } from "@/lib/services.config";
import TeamMember from "@/app/_components/team/TeamMember";

export default async function TeamSection() {
  const teams: Teams = await services.team.getTeams();

  return (
    <div className="flex flex-col">
      {teams.teams.map((team: Team, index: number) => (
        <div key={index}>
          <p className="mb-2 font-bold text-white">{team.category}</p>
          {team.items.map((member: Member, index: number) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
      ))}
    </div>
  );
}
