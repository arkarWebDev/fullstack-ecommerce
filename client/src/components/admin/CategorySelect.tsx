import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategorySelectProps {
  value?: string;
  onChange: (value: string) => void;
}

const CATEGORIES = [
  {
    id: "t-shirt",
    label: "T-shirt",
  },
  {
    id: "hoodie",
    label: "Hoodie",
  },
  {
    id: "shorts",
    label: "Shorts",
  },
  {
    id: "jeans",
    label: "Jeans",
  },
];
function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {CATEGORIES.map((cate) => (
          <SelectItem value={cate.id} key={cate.id}>
            {cate.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CategorySelect;
