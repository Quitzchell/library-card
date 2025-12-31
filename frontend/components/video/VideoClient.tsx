"use client"

import { VideoItemDisplay } from "@/lib/interfaces/video";
import VideoCarousel from "../common/VideoCarousel";

export default function VideoClient({items}: { items: VideoItemDisplay[]}) {


    return (
        <section className="flex flex-col space-y-5">
            <section className="grid gap-4">
                {/* todo: replace with lists per category */}
                <VideoCarousel videoList={{data: items}}/>
            </section>
        </section>
    )
}