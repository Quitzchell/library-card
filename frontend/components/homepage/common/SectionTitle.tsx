export default function SectionTitle({ title }: { title: string }) {
  return (
    <div className="border-y-2 border-dashed">
      <h2 className="container py-2 text-end text-2xl lg:text-start">
        {title}
      </h2>
    </div>
  );
}
