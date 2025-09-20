import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { clearCart } from "@/store/slices/cart";
import { useConfirmSessionQuery } from "@/store/slices/orderApi";
import { CircleCheck } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router";

function ConfirmOrder() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useConfirmSessionQuery(sessionId!);

  useEffect(() => {
    if (!sessionId || isError) {
      navigate("/");
    } else {
      dispatch(clearCart());
    }
  }, [sessionId, isError]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-center">
        <CircleCheck className="w-28 h-38 text-white fill-green-500" />
      </div>
      <div className="text-center">
        <h2 className="text-4xl font-bold">Thank you for your purchase</h2>
        <p className="text-muted-foreground mt-4">
          We've received your oder will ship in 5-7 business days.
        </p>
      </div>
      <div className="bg-white p-4 rounded-lg mt-8 shadow-[6px_6px_10px_6px_rgba(0,_0,_0,_0.1)]">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        {data?.items.map((product) => (
          <div className="flex items-center justify-between border-b-2 border-b-muted-foreground/20 py-4">
            <h4 className="text-lg font-medium">{product.name}</h4>
            <p className="text-lg">${product.price}</p>
          </div>
        ))}
        <div className="flex items-center justify-between py-4">
          <h4 className="text-lg font-medium">Total</h4>
          <p className="text-lg font-bold">${data?.bill}</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-6 mt-10">
        <Button asChild variant={"outline"}>
          <Link to={"/"}>Go to homepage</Link>
        </Button>
        <Button asChild>
          <Link to={"/profile/orders"}>Go to order page</Link>
        </Button>
      </div>
    </div>
  );
}

export default ConfirmOrder;
