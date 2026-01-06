import AboutServer from "@/components/about/AboutServer";

export default function ContactPage() {
  return (
    <div className="flex grow-1 flex-col py-8">
      <h1 className="container mb-8 text-4xl font-bold">About</h1>

      <section className="h-full space-y-12">
        <AboutServer />
      </section>
    </div>
  );
}
