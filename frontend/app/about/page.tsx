import AboutSection from "@/app/about/_components/AboutSection";

export default function ContactPage() {
  return (
    <div className="container flex grow-1 flex-col py-8">
      <h1 className="mb-8 text-4xl font-bold">About</h1>

      <section className="h-full content-center space-y-12">
        <AboutSection />
      </section>
    </div>
  );
}
