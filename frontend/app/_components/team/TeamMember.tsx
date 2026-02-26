import { Member } from "@/lib/interfaces/team";

type TeamMemberProps = {
  member: Member;
};

export default function TeamMember({ member }: TeamMemberProps) {
  return (
    <div className="flex space-x-2 text-white">
      {member.region && <p>{member.region}:</p>}
      <a
        href={`mailto:${member.contact}`}
        className="text-white hover:underline"
      >
        {member.contact}
      </a>
    </div>
  );
}
