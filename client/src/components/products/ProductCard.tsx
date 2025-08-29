import { Link } from "react-router";
import RatingCoverter from "../../common/RatingCoverter";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  ratingCount: number;
  id: string;
}

function ProductCard({
  name,
  price,
  image,
  ratingCount,
  id,
}: ProductCardProps) {
  return (
    <Link to={`/products/${id}`}>
      <img
        src={image}
        alt={name}
        className="rounded-lg h-60 object-cover border-2 border-gray-300 w-full"
      />
      <p className="font-medium my-2">
        {name.length > 20 ? name.slice(0, 20) + "..." : name}
      </p>
      <RatingCoverter count={ratingCount} />
      <p className="text-xl font-bold">${price}</p>
    </Link>
  );
}

export default ProductCard;
