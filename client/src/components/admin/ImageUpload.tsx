import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ImageUploadProps {
  images: Array<{ url: string; file?: File; public_alt?: string }>;
  onChange: (
    images: Array<{ url: string; file?: File; public_alt?: string }>
  ) => void;
}

function ImageUpload({ images, onChange }: ImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    onChange([...images, ...newImages]);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];

    if (images[index]?.url?.startsWith("blob:")) {
      URL.revokeObjectURL(images[index].url);
    }

    newImages.splice(index, 1);
    onChange(newImages);
  };
  return (
    <div>
      <div className="grid grid-cols-5 gap-4 mb-2">
        {images.map((image, index) => (
          <div className="relative group" key={index}>
            <img
              src={image.url || image.url}
              alt={`Prview ${index + 1}`}
              className={`w-full h-32 object-cover rounded-lg ${
                image.file && "border-2 border-black "
              }`}
            />
            <Button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant={"outline"}
        onClick={() => document.getElementById("image-upload")?.click()}
      >
        Add Images
      </Button>
      <input
        id="image-upload"
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

export default ImageUpload;
