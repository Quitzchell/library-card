type SectionTitleProps = {
  title: string;
};

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="border-y-2 border-dotted">
      <h2 className="container py-2 text-end text-2xl lg:text-start">
        {title}
      </h2>
    </div>
  );
}
