import { NavigationRoute, NavigationLabel } from "@/lib/enums/navigation";

export const navItems = [
  { name: NavigationLabel.TOUR, href: NavigationRoute.TOUR },
  { name: NavigationLabel.MUSIC, href: NavigationRoute.MUSIC },
  { name: NavigationLabel.CONTACT, href: NavigationRoute.CONTACT },
];

export const homeItem = {
  name: NavigationLabel.HOME,
  href: NavigationRoute.HOME,
};