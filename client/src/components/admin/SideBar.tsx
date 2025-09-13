import { Package } from "lucide-react";
import type React from "react";
import { Link } from "react-router";

interface Page {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const pages: Page[] = [
  {
    name: "Product management",
    path: "/admin/manage-products",
    icon: <Package className="w-6 h-6" />,
  },
];

function SideBar() {
  return (
    <div>
      {pages.map((page, index) => (
        <div key={index} className="flex gap-1 space-y-4">
          {page.icon}
          <Link to={page.path} className="font-medium">
            {page.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SideBar;
