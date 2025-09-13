import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Package } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface ProductStatusCardProps {
  title: string;
  iconColor?: string;
  isLoading: boolean;
  value: number;
}
function ProductStatusCard({
  title,
  iconColor = "text-muted-foreground",
  isLoading,
  value,
}: ProductStatusCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm">{title}</CardTitle>
        <Package className={`w-4 h-4 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading ? <Skeleton className="w-16 h-8" /> : <span>{value}</span>}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductStatusCard;
