import { Button } from "@/components/ui/button";

interface SizeSelectorProps {
  sizes: string[];
  onChange: (sizes: string[]) => void;
}

function SizeSelector({ sizes, onChange }: SizeSelectorProps) {
  const availableSizes = ["xs", "sm", "lg", "xl", "xxl"];

  const toggleSize = (selectedSize: string) => {
    if (sizes.includes(selectedSize)) {
      onChange(sizes.filter((s) => s !== selectedSize));
    } else {
      onChange([...sizes, selectedSize]);
    }
  };
  return (
    <div className="flex gap-2">
      {availableSizes.map((size) => (
        <Button
          key={size}
          type="button"
          onClick={() => toggleSize(size)}
          className={`${
            sizes.includes(size) &&
            "bg-black text-white hover:bg-black hover:text-white"
          }`}
          variant={"outline"}
        >
          {size.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}

export default SizeSelector;
