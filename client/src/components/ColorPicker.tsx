import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

interface ColorPickerProps {
  colors: string[];
  onChange: (colors: string[]) => void;
}

function ColorPicker({ colors, onChange }: ColorPickerProps) {
  const [inputColor, setInputColor] = useState("#000000");

  const addColor = () => {
    if (!colors.includes(inputColor)) {
      onChange([...colors, inputColor]);
    }
  };

  const removeColor = (selectedColor: string) => {
    onChange(colors.filter((color) => color !== selectedColor));
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="color"
          value={inputColor}
          onChange={(e) => setInputColor(e.target.value)}
          className="w-40 h-10"
        />
        <Button type="button" onClick={addColor}>
          Add color
        </Button>
      </div>
      <div className="flex gap-2">
        {colors.map((color, index) => (
          <div
            key={index}
            className="flex items-center gap-1 p-2 rounded-md border"
          >
            <div
              style={{ backgroundColor: color }}
              className="w-6 h-6 rounded-full border"
            />
            <span className="text-sm">{color}</span>
            <Button
              type="button"
              onClick={() => removeColor(color)}
              size={"sm"}
              variant={"outline"}
            >
              <X size={16} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColorPicker;
