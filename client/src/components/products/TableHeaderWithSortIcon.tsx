import { ArrowUpDown } from "lucide-react";
import type React from "react";

interface TableHeaderWithSortIconProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

function TableHeaderWithSortIcon({
  text,
  onClick,
}: TableHeaderWithSortIconProps) {
  return (
    <div onClick={onClick} className="w-full flex items-center justify-end">
      <span>{text}</span>
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </div>
  );
}

export default TableHeaderWithSortIcon;
