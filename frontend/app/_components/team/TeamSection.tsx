import { Member, Team } from "@/lib/interfaces/team";
import { services } from "@/lib/services.config";
import TeamMember from "@/app/_components/team/TeamMember";

export default async function TeamSection() {
  const teams: Team[] = await services.team.getTeams();

  return (
    <div className="flex flex-col">
      {teams.map((team: Team, index: number) => (
        <div key={index}>
          <p className="mb-2 font-bold text-white capitalize">
            {team.category}
          </p>
          {team.members.map((member: Member, index: number) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
      ))}
    </div>
  );
}
