import Topbar from "../components/Topbar";
import Secondarybar from "../components/Secondarybar";
import { useState } from "react";
import CartDrawer from "../components/cart/CartDrawer";

function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    console.log("Click");

    setIsCartOpen((prev) => !prev);
  };

  return (
    <nav>
      <Topbar toggleCart={toggleCart} />
      <Secondarybar />
      <CartDrawer isCartOpen={isCartOpen} toggleCart={toggleCart} />
    </nav>
  );
}

export default Navbar;
