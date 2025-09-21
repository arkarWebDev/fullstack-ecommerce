import { ChartLine, Edit, Package, UserCog } from "lucide-react";
import type React from "react";
import { Link, NavLink } from "react-router";

interface Page {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const pages: Page[] = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <ChartLine className="w-6 h-6" />,
  },
  {
    name: "Product management",
    path: "/admin/manage-products",
    icon: <Package className="w-6 h-6" />,
  },
  {
    name: "Order management",
    path: "/admin/manage-orders",
    icon: <Edit className="w-6 h-6" />,
  },
  {
    name: "User management",
    path: "/admin/manage-users",
    icon: <UserCog className="w-6 h-6" />,
  },
];

function SideBar() {
  return (
    <nav className="h-full">
      <div className="flex gap-2 space-y-2 flex-col pr-4">
        {pages.map((page, index) => (
          <NavLink
            to={page.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 rounded-lg font-medium text-sm py-2 transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`
            }
            key={index}
          >
            {page.icon}
            {page.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default SideBar;
