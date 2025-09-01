export default function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="container bg-black py-2 text-end text-2xl text-white">
      {title}
    </h2>
  );
}
