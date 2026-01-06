import { services } from "@/lib/services.config";
import AboutClient from "@/components/about/AboutClient";

export default async function AboutServer() {
    const biography = await services.biography.getBiography();
    const images = await services.image.getImageItems();

    return <AboutClient biography={biography} images={images}/> 
}