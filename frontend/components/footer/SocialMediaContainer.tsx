import { SocialMediaItem, SocialMediaList } from "@/lib/interfaces/social-media";
import { services } from "@/lib/services.config";
import { resolveIcon } from "@/utils/icon-factory";
import Link from "next/link";


export default async function SocialMediaContainer() {
  const socialMediaLists = await services.socialMedia.getSocialMediaList();
  return (
    <div className="flex flex-col">
      {socialMediaLists.lists.map(
        (socialMediaList: SocialMediaList, index: number) => (
          <div key={index}>
            <p className="mb-2 font-bold text-white">{socialMediaList.title}</p>
            {socialMediaList.items.map((socialMediaItem: SocialMediaItem, index: number) => (
                <SocialMedia key={index} socialMediaItem={socialMediaItem}/>
            ))}
          </div>
        ),
      )}
    </div>
  );
}

function SocialMedia({socialMediaItem}: {socialMediaItem: SocialMediaItem}) {
    const icon = resolveIcon(socialMediaItem.icon, { size: 20 });
    return (
        <Link
            href={socialMediaItem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-chart-1 transition-colors"
        >
            {icon}
        </Link>
    )
}
