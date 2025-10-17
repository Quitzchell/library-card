import ContactContainer from "./ContactContainer";
import SocialMediaContainer from "./SocialMediaContainer";

export default async function Footer() {
  return (
    <section className="container space-y-10 bg-black py-10">
      <ContactContainer />
      <SocialMediaContainer />
    </section>
  );
}
