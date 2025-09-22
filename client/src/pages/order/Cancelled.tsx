import { useEffect } from "react";
import { useNavigate } from "react-router";

function Cancelled() {
  const naviagte = useNavigate();

  useEffect(() => {
    naviagte("/");
  }, []);
  return <div>Cancelled</div>;
}

export default Cancelled;
