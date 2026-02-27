import { Member } from "@/lib/interfaces/team";

type TeamMemberProps = {
  member: Member;
};

export default function TeamMember({ member }: TeamMemberProps) {
  return (
    <div className="flex space-x-2 text-white">
      {member.region && (
        <>
          <p>{member.region}:</p>
        </>
      )}

      {member.org && (
        <>
          <p>{member.org}</p>
          <span>•</span>
        </>
      )}

      <a href={`mailto:${member.email}`} className="text-white hover:underline">
        {member.email}
      </a>
    </div>
  );
}
