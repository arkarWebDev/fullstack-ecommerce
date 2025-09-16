import ProductStatusCard from "@/components/admin/ProductStatusCard";
import OrderTable from "@/components/products/OrderTable";
import ProductChart from "@/components/products/ProductChart";
import RecentProduct from "@/components/products/RecentProduct";

import { useGetProductsQuery } from "@/store/slices/productApi";
import type { Product } from "@/types/product";

function Dashboard() {
  const { data: products = [], isLoading } = useGetProductsQuery({}) as {
    data: Product[];
    isLoading: boolean;
  };

  const totalProductsLength = products.length;
  const featuredProductsLength = products.filter((p) => p.is_feature).length;
  const newArrivalProductsLength = products.filter(
    (p) => p.is_new_arrival
  ).length;
  const instockProductCount = products.reduce(
    (sum, p) => sum + p.instock_count,
    0
  );

  return (
    <section>
      <div className="grid gap-6 mb-8 grid-cols-4">
        <ProductStatusCard
          title={"Total Products"}
          value={totalProductsLength}
          isLoading={isLoading}
        />
        <ProductStatusCard
          title={"Featured"}
          value={featuredProductsLength}
          isLoading={isLoading}
        />
        <ProductStatusCard
          title={"New Arrivals"}
          value={newArrivalProductsLength}
          isLoading={isLoading}
        />
        <ProductStatusCard
          title={"Total In Stock"}
          value={instockProductCount}
          isLoading={isLoading}
        />
      </div>
      <ProductChart data={products} />
      <div className="mt-8 flex gap-6">
        <RecentProduct data={products} />
        <OrderTable />
      </div>
    </section>
  );
}

export default Dashboard;
