import { Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

function SearchBox() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialKeyword = searchParams.get("keyword") || "";
  const [keyword, setKeyword] = useState(initialKeyword);

  useEffect(() => {
    const urlKeyword = searchParams.get("keyword") || "";
    setKeyword(urlKeyword);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateKeywordInUrl(keyword.trim());
  };

  const updateKeywordInUrl = (newKeyword: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (newKeyword) {
      newParams.set("keyword", newKeyword);
    } else {
      newParams.delete("keyword");
    }
    const newSearchQuery = newParams.toString();
    const path = newSearchQuery
      ? `/products/filter?${newSearchQuery}`
      : "/products/filter";
    navigate(path, { replace: true });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);

    if (value === "" && searchParams.get("keyword")) {
      updateKeywordInUrl("");
    }
  };

  const handleClear = () => {
    setKeyword("");
    updateKeywordInUrl("");
  };

  return (
    <div className=" w-96 relative">
      <form onSubmit={handleSearch}>
        <input
          className="bg-gray-200 focus:outline-0 py-2 ps-10 text-black text-sm w-full rounded-full"
          value={keyword}
          onChange={handleInputChange}
        />
        <Search className="absolute top-1.5 left-2 text-black" />
        {keyword && (
          <X
            className="w-5 h-5 absolute top-1.5 right-2 text-black cursor-pointer"
            onClick={handleClear}
          />
        )}
      </form>
    </div>
  );
}

export default SearchBox;
