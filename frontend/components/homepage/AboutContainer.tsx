import { NavigationLabel } from "@/lib/enums";
import SectionTitle from "./common/SectionTitle";
import BiographyContainer from "../about/BiographyContainer";

export default function AboutContainer() {
  return (
    <section className="space-y-6">
      <SectionTitle title={NavigationLabel.ABOUT} />

      <div className="container space-y-6">
        <BiographyContainer />
      </div>
    </section>
  );
}
