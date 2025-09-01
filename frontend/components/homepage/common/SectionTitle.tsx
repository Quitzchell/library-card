export default function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="container py-2 text-end text-2xl border-dashed border-y-2">
      {title}
    </h2>
  );
}
