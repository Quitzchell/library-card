export default function HomeTitle({ title }: { title: string }) {
  return (
    <h2 className="bg-black px-4 py-2 text-end text-2xl text-white">{title}</h2>
  );
}
