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
  defaultPath: string;
  items: TAdminNavItem[];
}

export const adminNavGroups: TAdminNavGroup[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <FiGrid size={20} />,
    defaultPath: "/admin/dashboard",
    items: [
      { label: "Dashboard", path: "/admin/dashboard" },
      { label: "Analytics", path: "/admin/dashboard/analytics" },
      { label: "Activity", path: "/admin/dashboard/activity" },
    ],
  },
  {
    id: "commerce",
    label: "Commerce",
    icon: <FiShoppingBag size={20} />,
    defaultPath: "/admin/dashboard/orders-management",
    items: [
      { label: "Orders", path: "/admin/dashboard/orders-management" },
      { label: "Products", path: "/admin/dashboard/products-management" },
      { label: "Categories", path: "/admin/dashboard/categories-management" },
      { label: "Occasions", path: "/admin/dashboard/occasions-management" },
      { label: "Materials", path: "/admin/dashboard/materials-management" },
    ],
  },
  {
    id: "people",
    label: "People",
    icon: <FiUsers size={20} />,
    defaultPath: "/admin/dashboard/users",
    items: [
      { label: "Users", path: "/admin/users" },
      { label: "Reviews", path: "/admin/reviews" },
    ],
  },
  {
    id: "content",
    label: "Content",
    icon: <FiLayers size={20} />,
    defaultPath: "/admin/dashboard/heroes",
    items: [
      { label: "Hero Banners", path: "/admin/heroes" },
      { label: "Media", path: "/admin/media" },
    ],
  },
  {
    id: "system",
    label: "System",
    icon: <FiSettings size={20} />,
    defaultPath: "/admin/dashboard/settings",
    items: [
      { label: "Settings", path: "/admin/settings" },
      { label: "Help", path: "/admin/help" },
    ],
  },
];

// Helper to find active group
export const findActiveGroup = (pathname: string) => {
  // Build a flat list of { group, pathLength } for all items
  const matches: { group: TAdminNavGroup; length: number }[] = [];

  adminNavGroups.forEach((group) => {
    group.items.forEach((item) => {
      // Segment-aware match: exact OR starts with item.path + "/"
      const isMatch =
        pathname === item.path || pathname.startsWith(item.path + "/");
      if (isMatch) {
        matches.push({ group, length: item.path.length });
      }
    });
  });

  // Most specific (longest path) wins
  matches.sort((a, b) => b.length - a.length);
  return matches[0]?.group;
};

export const findActiveItem = (pathname: string) => {
  const allItems = adminNavGroups.flatMap((g) => g.items);
  const matches = allItems.filter(
    (i) => pathname === i.path || pathname.startsWith(i.path + "/"),
  );
  // Most specific match
  return matches.sort((a, b) => b.path.length - a.path.length)[0];
};