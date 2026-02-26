import {
  SocialMediaLink,
  SocialMediaGroup,
} from "@/lib/interfaces/social-media";
import { services } from "@/lib/services.config";
import SocialMedia from "@/app/_components/social-media/SocialMedia";

export default async function SocialMediaSection() {
  const socialMediaGroups = await services.socialMedia.getSocialMediaGroups();
  return (
    <div className="flex flex-col">
      {socialMediaGroups.groups.map(
        (group: SocialMediaGroup, index: number) => (
          <div key={index}>
            <p className="mb-2 font-bold text-white">{group.category}</p>
            {group.items.map((link: SocialMediaLink, index: number) => (
              <SocialMedia key={index} link={link} />
            ))}
          </div>
        ),
      )}
    </div>
  );
}
