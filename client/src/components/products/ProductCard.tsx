import RatingCoverter from "../../common/RatingCoverter";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  ratingCount: number;
}

function ProductCard({ name, price, image, ratingCount }: ProductCardProps) {
  return (
    <div>
      <img src={image} alt={name} className="rounded-lg" />
      <p className="font-medium my-2">{name}</p>
      <RatingCoverter count={ratingCount} />
      <p className="text-xl font-bold">${price}</p>
    </div>
  );
}

export default ProductCard;
