import type { Product } from "@/types/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

interface RecentProductProps {
  data: Product[];
}
function RecentProduct({ data }: RecentProductProps) {
  const recentProducts = [...data]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  return (
    <div className="flex-1">
      <Card>
        <CardHeader>
          <CardTitle>Recent Products</CardTitle>
          <CardDescription>showing 4 of recent products</CardDescription>
        </CardHeader>
        <CardContent>
          {recentProducts.map((product) => (
            <div className="py-2 border-b border-b-gray-300">
              <h2 className="text-sm font-medium mb-0.5">{product.name}</h2>
              <Badge>{product.category}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default RecentProduct;
