import ProductStatusCard from "@/components/admin/ProductStatusCard";
import ProductTable from "@/components/products/ProductTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetProductsQuery } from "@/store/slices/productApi";
import type { Product } from "@/types/product";
import { PackagePlus } from "lucide-react";
import { Link } from "react-router";

function ProductManagement() {
  const {
    data: response,
    isLoading,
    error,
  } = useGetProductsQuery({}) as {
    data: Product[];
    isLoading: boolean;
    error: any;
  };

  const products = response || [];

  if (error) {
    return (
      <div>
        <Card>
          <CardContent>
            <p className=" text-destructive">
              Failed to load products. Please try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory and take actions
          </p>
        </div>
        <Button asChild>
          <div className="flex items-center gap-1">
            <PackagePlus className="w-8 h-8" />
            <Link to={"/admin/create-product"}>Add new product</Link>
          </div>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <ProductStatusCard
          title="Total Products"
          isLoading={isLoading}
          value={products.length}
        />
        <ProductStatusCard
          title="In Stock"
          isLoading={isLoading}
          iconColor="text-green-500"
          value={products.filter((p) => p.instock_count > 0).length}
        />
        <ProductStatusCard
          title="Out of Stock"
          isLoading={isLoading}
          iconColor="text-red-500"
          value={products.filter((p) => p.instock_count === 0).length}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>Manage and sort your products</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductTable data={products} />
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductManagement;
