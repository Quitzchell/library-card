import { VideoCategory } from "@/lib/enums/video-category";
import { Video, VideoResponse } from "@/lib/interfaces/video";

export const videoMock = {
  async getVideoItems(take?: number): Promise<VideoResponse> {
    return { data: take ? VideoItemList.slice(0, take) : VideoItemList };
  },

  async getVideoItemsByCategory(category: string): Promise<VideoResponse> {
    return {
      data: VideoItemList.filter((video) => video.category === category),
    };
  },
};

// Mockdata
const VideoItemList: Array<Video> = [
  {
    id: 1,
    title: "Art School",
    video_id: "Yne-u4IEUT4",
    category: VideoCategory.VIDEOCLIP,
  },
  {
    id: 2,
    title: "For the World is Hollow",
    video_id: "qewpFSU6Sd0",
    category: VideoCategory.VIDEOCLIP,
  },
  {
    id: 3,
    title: "Rockpalast @ Eurosonic 2025",
    video_id: "-Ro9Q1ABfdw",
    category: VideoCategory.LIVE,
  },
  {
    id: 4,
    title: "NTR @ Eurosonic 2024",
    video_id: "4emK4fF-igU",
    category: VideoCategory.LIVE,
  },
  {
    id: 5,
    title: "Mirror Factory",
    video_id: "CedA_EOk0gY",
    category: VideoCategory.VIDEOCLIP,
  },
  {
    id: 6,
    title: "Sunflowers",
    video_id: "OIRaQ6jPTXA",
    category: VideoCategory.VIDEOCLIP,
  },
];
