import ContactContainer from "./ContactContainer";
import SocialMediaContainer from "./SocialMediaLinks";

export default async function Footer() {
  return (
    <section className="bg-black py-10">
      <div className="container space-y-10">
        <ContactContainer />
        <SocialMediaContainer />
      </div>
    </section>
  );
}
