import { NavigationLabel } from "@/lib/enums";

export type GetImageItemsParams = {
  page?: number;
  perPage?: number;
  target?: NavigationLabel | null;
};
