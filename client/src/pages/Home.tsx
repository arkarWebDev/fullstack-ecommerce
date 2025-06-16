import React from "react";
import ProductList from "../components/products/ProductList";

function Home() {
  return (
    <main className="mt-16">
      <section>
        <h1 className="text-2xl font-bold mb-6 text-center">NEW ARRIVALS</h1>
        <ProductList />
      </section>
      <section className="mt-16">
        <h1 className="text-2xl font-bold mb-6 text-center">BEST DEALS</h1>
        <ProductList />
      </section>
    </main>
  );
}

export default Home;
