import { RichTextItem } from "@/lib/interfaces/rich-text";

export default function RichText({
  biographyItem: richTextItem,
}: {
  biographyItem: RichTextItem;
}) {
  return (
    <div className="flex flex-col space-y-4">
      {richTextItem.title && (
        <h3 className="text-2xl font-bold">{richTextItem.title}</h3>
      )}
      <div
        className="prose prose-sm max-w-none space-y-4"
        dangerouslySetInnerHTML={{ __html: richTextItem.text }}
      />
    </div>
  );
}
