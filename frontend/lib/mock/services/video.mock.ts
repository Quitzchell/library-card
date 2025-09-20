import { VideoItemDisplay, VideoItemResponse } from "@/lib/interfaces/video";

export const videoMock = {
  async getVideoItems(page = 0, perPage = 10): Promise<VideoItemResponse> {
    const from = page * perPage;
    const to = from + perPage;
    const data: VideoItemDisplay[] = VideoItemList.slice(from, to);
    const totalItems = VideoItemList.length;
    const lastPage = Math.ceil(totalItems / perPage);

    return {
      data: data,
      meta: {
        current_page: page,
        last_page: lastPage,
        per_page: perPage,
        total: totalItems,
      },
    };
  },
};

// Mockdata
const VideoItemList: Array<VideoItemDisplay> = [
  {
    id: 1,
    title: "Art School",
    video_id: "Yne-u4IEUT4",
  },
  {
    id: 2,
    title: "For the World is Hollow",
    video_id: "qewpFSU6Sd0",
  },
  {
    id: 3,
    title: "Rockpalast @ Eurosonic 2025",
    video_id: "-Ro9Q1ABfdw",
  },
  {
    id: 4,
    title: "NTR @ Eurosonic 2024",
    video_id: "4emK4fF-igU",
  },
  {
    id: 5,
    title: "Mirror Factory",
    video_id: "CedA_EOk0gY",
  },
  {
    id: 6,
    title: "Sunflowers",
    video_id: "OIRaQ6jPTXA",
  },
];
