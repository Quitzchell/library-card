import { NavigationRoute, NavigationLabel } from "@/lib/enums/navigation";

export const navItems = [
  { name: NavigationLabel.TOUR, href: NavigationRoute.TOUR },
  { name: NavigationLabel.MUSIC, href: NavigationRoute.MUSIC },
  { name: NavigationLabel.VIDEO, href: NavigationRoute.VIDEO },
  { name: NavigationLabel.ABOUT, href: NavigationRoute.ABOUT },
  { name: NavigationLabel.CONTACT, href: NavigationRoute.CONTACT },
];

export const homeItem = {
  name: NavigationLabel.HOME,
  href: NavigationRoute.HOME,
};
