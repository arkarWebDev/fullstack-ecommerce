import { Search } from "lucide-react";
import React from "react";

function SearchBox() {
  return (
    <div className=" w-96 relative">
      <form>
        <input className="bg-gray-200 focus:outline-0 py-2 ps-10 text-black text-sm w-full rounded-full" />
        <Search className="absolute top-1.5 left-2 text-black" />
      </form>
    </div>
  );
}

export default SearchBox;
