import Link from "next/link";
import { resolveIcon } from "@/factories/icon-factory";
import { SocialMediaLink } from "@/lib/interfaces/social-media";

export default function SocialMedia({ link }: { link: SocialMediaLink }) {
  const icon = resolveIcon(link.icon, { size: 20 });
  return (
    <Link
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-chart-1 text-white transition-colors"
    >
      {icon}
    </Link>
  );
}
