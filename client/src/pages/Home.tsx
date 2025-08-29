import {
  useGetFeaturedQuery,
  useGetNewArrivalsQuery,
} from "@/store/slices/productApi";
import ProductList from "../components/products/ProductList";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

function Home() {
  const { data: newArrivals = [] } = useGetNewArrivalsQuery(undefined);
  const { data: featured = [] } = useGetFeaturedQuery(undefined);

  return (
    <main className="mt-16">
      <section>
        <h1 className="text-3xl font-bold mb-6 text-center">NEW ARRIVALS</h1>
        <ProductList products={newArrivals} />
        <div className="flex justify-center mt-8">
          <Button asChild variant={"outline"}>
            <Link to={"/products/filter"}>View All</Link>
          </Button>
        </div>
      </section>
      <section className="mt-16">
        <h1 className="text-3xl font-bold mb-6 text-center">FEATURED</h1>
        <ProductList products={featured} />
        <div className="flex justify-center mt-8">
          <Button asChild variant={"outline"}>
            <Link to={"/products/filter"}>View All</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

export default Home;
