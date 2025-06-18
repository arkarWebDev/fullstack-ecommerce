import { useEffect, useState } from "react";
import { useParams } from "react-router";
import RatingCoverter from "../common/RatingCoverter";
import { Minus, Plus } from "lucide-react";

const product = {
  id: 1,
  name: "Black T-Shirt",
  price: 200,
  category: "T-shirt",
  size: ["Small", "Medium", "Large"],
  colors: ["#F2440F", "#000000", "#f20fcc"],
  description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, vero aut similique fuga repellat ratione.",
  rating: 4,
  images: [
    {
      url: "https://iili.io/FCGxQTv.png",
    },
    {
      url: "https://cdn.shopify.com/s/files/1/0380/4705/6011/files/municipal-apparel_sport-utility-ss-t-shirt_black_MMTEE137_front.jpg",
    },
    {
      url: "https://www.monterrain.co.uk/images/products/medium/4105928_2.jpg",
    },
    {
      url: "https://www.mytheresa.com/media/1094/1238/100/3e/P00895460_d1.jpg",
    },
  ],
};

function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [selectedSize, setSelectedSize] = useState<string>("Medium");
  const { id } = useParams();

  useEffect(() => {
    if (product.images.length > 0) {
      setSelectedImage(product.images[0].url);
    }
  }, [product]);

  return (
    <section className="grid grid-cols-2 gap-8">
      <div className="grid grid-cols-4">
        <div className=" col-span-1 flex flex-col gap-4">
          {product.images.map((image, index) => (
            <div
              className={`${
                selectedImage === image.url &&
                "border-2 border-gray-400 w-fit rounded-xl"
              }`}
            >
              <img
                src={image.url}
                alt={image.url}
                key={index}
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
        <RatingCoverter count={product.rating} />
        <p className="text-3xl font-extrabold my-2">${product.price}</p>
        <p className="text-sm font-medium text-gray-400">
          {product.description}
        </p>
        <hr className="mt-4 text-gray-300" />
        <h2 className="text-xl font-bold my-2">Colors</h2>
        <div className="flex items-center gap-2">
          {product.colors.map((color, i) => (
            <div
              className={`w-6 h-6 rounded-full cursor-pointer ${
                selectedColor === color && "border-2 border-gray-300"
              }`}
              style={{ backgroundColor: color }}
              key={i}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
        <hr className="mt-4 text-gray-300" />
        <h2 className="text-xl font-bold my-2">Sizes</h2>
        <div className="flex items-center gap-2">
          {product.size.map((size, i) => (
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
            <button className="bg-black p-2 text-white rounded-md">
              <Plus className="w-4 h-4" />
            </button>
            <span className="font-medium">1</span>
            <button className="bg-black p-2 text-white rounded-md">
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
