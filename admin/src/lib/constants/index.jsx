import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
  HiOutlineLocationMarker,
} from "react-icons/hi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "add products",
    label: "Add Product",
    path: "/admin/add-product",
    icon: <HiOutlineCube />,
  },
  {
    key: "products",
    label: "Products",
    path: "/admin/products",
    icon: <HiOutlineCube />,
  },
  {
    key: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <HiOutlineShoppingCart />,
  },
  {
    key: "customers",
    label: "Customers",
    path: "/admin/customers",
    icon: <HiOutlineUsers />,
  },
  {
    key: "news",
    label: "Add News",
    path: "/admin/add-news",
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "news list",
    label: "News List",
    path: "/admin/news",
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "Add branch",
    label: "Add branch",
    path: "/admin/add-branch",
    icon: <HiOutlineLocationMarker />,
  },
  {
    key: "branches",
    label: "Branches",
    path: "/admin/branches",
    icon: <HiOutlineLocationMarker />,
  },
  {
    key: "messages",
    label: "Messages",
    path: "/admin/messages",
    icon: <HiOutlineAnnotation />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/admin/settings",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
