import { NavigationLabel } from "@/lib/enums";
import SectionTitle from "../../common/SectionTitle";
import Biography from "../components/Biography";
import { services } from "@/lib/services.config";

export default async function AboutContainer() {
  const biographyItem = await services.biography.getBiography();

  return (
    <div className="space-y-6">
      <SectionTitle title={NavigationLabel.ABOUT} />

      <div className="container space-y-6">
        <Biography biographyItem={biographyItem} />
        
      </div>
    </div>
  );
}
