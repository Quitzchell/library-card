import { BiographyItem } from "@/lib/interfaces/biography";

export default function Biography({
  biographyItem,
}: {
  biographyItem: BiographyItem;
}) {
  return (
    <div className="flex flex-col space-y-4">
      {biographyItem.title && (
        <h3 className="font-bold text-2xl">{biographyItem.title}</h3>
      )}
      <div
        className="prose prose-sm max-w-none space-y-4"
        dangerouslySetInnerHTML={{ __html: biographyItem.text }}
      />
    </div>
  );
}
