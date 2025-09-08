import { useEffect, useState } from "react";
import { useParams } from "react-router";
import RatingCoverter from "../common/RatingCoverter";
import { Minus, Plus } from "lucide-react";
import { useGetProductDetailQuery } from "@/store/slices/productApi";
import type { ProductImage } from "@/types/product";

function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [selectedSize, setSelectedSize] = useState<string>();
  const [quantity, setQuantity] = useState<number>(1);
  const { id } = useParams();

  const { data: product, isLoading } = useGetProductDetailQuery(id as string);

  useEffect(() => {
    if (product) {
      if (product.images.length > 0) setSelectedImage(product.images[0].url);
      console.log(selectedImage, product?.images[0].url);
      if (product.colors.length > 0) setSelectedColor(product.colors[0]);
      if (product.sizes.length > 0) setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (isLoading) return <p>Loading ...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <section className="grid grid-cols-2 gap-8">
      <div className="grid grid-cols-4">
        <div className=" col-span-1 flex flex-col gap-4">
          {product.images.map((image: ProductImage, index: number) => (
            <div
              className={`${
                selectedImage === image.url &&
                "border-2 border-gray-400 w-fit rounded-xl"
              }`}
              key={index}
            >
              <img
                src={image.url}
                alt={image.url}
                className="w-24 h-24 object-cover rounded-xl cursor-pointer"
                onClick={() => setSelectedImage(image.url)}
              />
            </div>
          ))}
        </div>
        <img
          src={selectedImage}
          alt={selectedImage}
          className="col-span-3 h-full aspect-square rounded-xl object-cover
        "
        />
      </div>
      <div className="flex flex-col justify-between">
        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
        <RatingCoverter count={product.rating_count} />
        <p className="text-3xl font-extrabold my-2">${product.price}</p>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
        <hr className="mt-4 text-gray-300" />
        <h2 className="text-xl font-bold my-2">Colors</h2>
        <div className="flex items-center gap-2">
          {product.colors.map((color: string, i: number) => (
            <div
              className={`w-6 h-6 rounded-full cursor-pointer ${
                selectedColor === color && "border-2 border-gray-300"
              }`}
              style={{ backgroundColor: color }}
              key={i}
              onClick={() => setSelectedColor(color)}
              title={color}
            />
          ))}
        </div>
        <hr className="mt-4 text-gray-300" />
        <h2 className="text-xl font-bold my-2">Sizes</h2>
        <div className="flex items-center gap-2">
          {product.sizes.map((size: string, i: number) => (
            <div
              className={`border border-gray-400 text-gray-400 px-4 py-2 rounded-full text-sm cursor-pointer ${
                selectedSize === size && "text-white bg-black border-black"
              }`}
              key={i}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </div>
          ))}
        </div>
        <hr className="mt-4 text-gray-300" />
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              className="bg-black p-2 text-white rounded-md cursor-pointer"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              <Plus className="w-4 h-4" />
            </button>
            <span className="font-medium">{quantity}</span>
            <button
              className="bg-black p-2 text-white rounded-md cursor-pointer"
              onClick={() =>
                setQuantity((prev) => {
                  if (prev === 1) {
                    return 1;
                  }
                  return prev - 1;
                })
              }
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
          <button className="w-full text-center py-2 bg-black text-sm font-medium text-white rounded-full">
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
