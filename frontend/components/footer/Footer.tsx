import ContactContainer from "./ContactContainer";
import SocialMediaContainer from "./SocialMediaContainer";

export default async function Footer() {
  return (
    <section className="container bg-black py-10 space-y-10">
      <ContactContainer />
      <SocialMediaContainer />
    </section>
  );
}
