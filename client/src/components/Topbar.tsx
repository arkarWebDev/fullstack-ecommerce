import SearchBox from "../common/SearchBox";
import { ShoppingCart, User } from "lucide-react";

interface TopbarProps {
  toggleCart(): void;
}

function Topbar({ toggleCart }: TopbarProps) {
  return (
    <main className="text-white bg-black py-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h2 className="font-extrabold text-3xl">FASH.COM</h2>
        <SearchBox />
        <div className="flex items-center gap-4">
          <ShoppingCart onClick={toggleCart} />
          <User />
        </div>
      </div>
    </main>
  );
}

export default Topbar;
