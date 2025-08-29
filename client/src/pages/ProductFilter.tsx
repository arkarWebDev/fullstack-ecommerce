import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import {
  useGetProductsMetaQuery,
  useGetProductsQuery,
} from "@/store/slices/productApi";
import type { Product, ProductFilters } from "@/types/product";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

function ProductFilter() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialFilters = (): ProductFilters => {
    const queryParams = new URLSearchParams(location.search);
    return {
      keyword: queryParams.get("keyword") || "",
      category: queryParams.get("category") || "",
      minPrice: queryParams.get("minPrice") || "",
      maxPrice: queryParams.get("maxPrice") || "",
      colors: queryParams.getAll("colors"),
      sizes: queryParams.getAll("sizes"),
    };
  };

  // local state ( ui update / from url)
  const [filters, setFilters] = useState(initialFilters);

  // update local state ( when url change )
  useEffect(() => {
    setFilters(initialFilters());
  }, [location.search]);

  // sync url
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.keyword) params.set("keyword", filters.keyword);
    if (filters.category) params.set("category", filters.category);

    filters.colors.forEach((color) => params.append("colors", color));
    filters.sizes.forEach((size) => params.append("sizes", size));

    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);

    const newSearchQuery = params.toString();
    const currentSearchQuery = location.search.slice(1);

    if (newSearchQuery !== currentSearchQuery) {
      const timeoutId = setTimeout(() => {
        navigate(
          { pathname: "/products/filter", search: newSearchQuery },
          { replace: true }
        );
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [filters, navigate, location.search]);

  const { data: products = [], isLoading } = useGetProductsQuery(filters) as {
    data: Product[];
    isLoading: boolean;
  };
  const { data: product_meta } = useGetProductsMetaQuery("none");

  // filter state -> {colors : ["Red","Blue"],sizes : ["S","M"],...}

  const toggleValue = (key: "colors" | "sizes", value: string) => {
    setFilters((prev) => {
      const currentValues = prev[key]; // ["Red","Blue"]
      const newValues = currentValues.includes(value)
        ? currentValues.filter((x) => x !== value)
        : [...currentValues, value];
      return { ...prev, [key]: newValues };
    });
  };

  const handlePriceChange = (type: "minPrice" | "maxPrice", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      keyword: "",
      category: "",
      colors: [],
      sizes: [],
      minPrice: "",
      maxPrice: "",
    });
    navigate("/products/filter", { replace: true });
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.keyword ||
      filters.category ||
      filters.colors.length > 0 ||
      filters.sizes.length > 0 ||
      filters.minPrice ||
      filters.maxPrice
    );
  }, [filters]);

  return (
    <div className="grid grid-cols-12">
      <div className=" col-span-2">
        <h2 className="text-xl font-bold mb-2">Product Filters</h2>
        <h3 className="text-lg font-bold mb-2">Colors</h3>
        <div className="flex flex-col gap-1">
          {product_meta?.colors.map((color, index) => (
            <label key={index}>
              <input
                type="checkbox"
                className="mr-1"
                onChange={() => toggleValue("colors", color)}
                checked={filters.colors.includes(color)}
              />
              <span>{color}</span>
            </label>
          ))}
        </div>

        <h3 className="text-lg font-bold mb-2 mt-4">Sizes</h3>
        <div className="flex flex-col gap-1">
          {product_meta?.sizes.map((size, index) => (
            <label key={index}>
              <input
                type="checkbox"
                className="mr-1"
                onChange={() => toggleValue("sizes", size)}
                checked={filters.sizes.includes(size)}
              />{" "}
              <span>{size}</span>
            </label>
          ))}
        </div>

        <h3 className="text-lg font-bold mb-2 mt-4">Price</h3>
        <div className="flex flex-col gap-1">
          <input
            type="number"
            min={0}
            placeholder={`Min (${product_meta?.minPrice})`}
            className="border p-1"
            value={filters.minPrice!}
            onChange={(e) => handlePriceChange("minPrice", e.target.value)}
          />
          <input
            type="number"
            min={product_meta?.minPrice}
            placeholder={`Max (${product_meta?.maxPrice})`}
            className="border p-1"
            value={filters.maxPrice!}
            onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
          />
        </div>
        {hasActiveFilters && (
          <Button
            variant={"destructive"}
            onClick={clearAllFilters}
            className="w-full mt-2"
          >
            Clear all
          </Button>
        )}
      </div>

      <div className="col-span-10">
        {isLoading ? (
          <p>Loading ...</p>
        ) : products.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <div className="grid grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard
                  name={product.name}
                  id={product._id}
                  image={product.images[0].url}
                  price={product.price}
                  ratingCount={product.rating}
                  key={product._id}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductFilter;
