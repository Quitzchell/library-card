import { NavigationLabel } from "@/lib/enums";
import { ImageItemDisplay, ImageItemResponse } from "@/lib/interfaces/image";

export const imageMock = {
  async getImageItems(
    page = 0,
    perPage = 10,
    target = null,
  ): Promise<ImageItemResponse> {
    const from = page * perPage;
    const to = from + perPage;

    const filteredItems = target
      ? ImageItemList.filter((image) => image.target === target)
      : ImageItemList;

    const paginatedItems = filteredItems.slice(from, to);

    const totalItems = filteredItems.length;
    const lastPage = Math.ceil(totalItems / perPage);

    return {
      data: paginatedItems,
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
    alt: "Mock image of The Beatles",
    target: NavigationLabel.ABOUT,
  },
  {
    id: 2,
    src: "/images/mock-press-image-2.jpeg",
    alt: "Mock image of The Beatles",
    target: NavigationLabel.ABOUT,
  },
];
