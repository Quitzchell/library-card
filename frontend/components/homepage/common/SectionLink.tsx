import Link from "next/link";

export default function SectionLink({ href, text }: { href: string; text: string }) {
  return (
    <div className="flex justify-end">
      <Link
        href={href}
        className="-my-2 p-2 underline hover:bg-black hover:text-white"
      >
        {text}
      </Link>
    </div>
  );
}