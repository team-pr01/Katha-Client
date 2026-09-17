import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiSettings,
  FiLayers,
} from "react-icons/fi";
import type { ReactNode } from "react";

export interface TAdminNavItem {
  label: string;
  path: string;
}

export interface TAdminNavGroup {
  id: string;
  label: string;
  icon: ReactNode;
  items: TAdminNavItem[];
}

export const adminNavGroups: TAdminNavGroup[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <FiGrid size={20} />,
    items: [
      { label: "Dashboard", path: "/admin/dashboard" },
      { label: "Analytics", path: "/admin/analytics" },
      { label: "Activity", path: "/admin/activity" },
    ],
  },
  {
    id: "commerce",
    label: "Commerce",
    icon: <FiShoppingBag size={20} />,
    items: [
      { label: "Orders", path: "/admin/orders" },
      { label: "Products", path: "/admin/products" },
      { label: "Categories", path: "/admin/categories" },
      { label: "Occasions", path: "/admin/occasions" },
    ],
  },
  {
    id: "people",
    label: "People",
    icon: <FiUsers size={20} />,
    items: [
      { label: "Users", path: "/admin/users" },
      { label: "Reviews", path: "/admin/reviews" },
    ],
  },
  {
    id: "content",
    label: "Content",
    icon: <FiLayers size={20} />,
    items: [
      { label: "Hero Banners", path: "/admin/heroes" },
      { label: "Media", path: "/admin/media" },
    ],
  },
  {
    id: "system",
    label: "System",
    icon: <FiSettings size={20} />,
    items: [
      { label: "Settings", path: "/admin/settings" },
      { label: "Help", path: "/admin/help" },
    ],
  },
];

// Helper to find active group
export const findActiveGroup = (pathname: string) =>
  adminNavGroups.find((g) =>
    g.items.some((i) => pathname.startsWith(i.path)),
  );

// Helper to find active item
export const findActiveItem = (pathname: string) =>
  adminNavGroups
    .flatMap((g) => g.items)
    .find((i) => pathname.startsWith(i.path));