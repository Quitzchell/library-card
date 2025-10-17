import { ImageItemDisplay, ImageItemResponse } from "@/lib/interfaces/image";

export const imageMock = {
  async getImageItems(page = 0, perPage = 10): Promise<ImageItemResponse> {
    const from = page * perPage;
    const to = from + perPage;
    const data: ImageItemDisplay[] = ImageItemList.slice(from, to);
    const totalItems = ImageItemList.length;
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
const ImageItemList: Array<ImageItemDisplay> = [
  {
    id: 1,
    src: "/images/mock-press-image-1.jpeg",
    caption: "This is a caption",
    alt: "Mock image of The Beatles",
  },
  {
    id: 2,
    src: "/images/mock-press-image-2.jpeg",
    caption: "",
    alt: "Mock image of The Beatles",
  },
];
