import { Link, useNavigate } from "react-router";
import SearchBox from "../common/SearchBox";
import { LogIn, ShoppingCart, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";

interface TopbarProps {
  toggleCart(): void;
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clearUserInfo } from "@/store/slices/auth";
import { useCurrentUserQuery, useLogoutMutation } from "@/store/slices/userApi";
import { useEffect } from "react";
import { apiSlice } from "@/store/slices/api";

function Topbar({ toggleCart }: TopbarProps) {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const productInCart = useSelector(
    (state: RootState) => state.cart.items.length
  );
  const dispatch = useDispatch();
  const [logoutMutation, { isLoading }] = useLogoutMutation();
  const { isError, data: currentUser } = useCurrentUserQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      dispatch(clearUserInfo());
      navigate("/");
    }
  }, [isError]);

  const logoutHandler = async () => {
    try {
      await logoutMutation({});
      dispatch(clearUserInfo());
      dispatch(apiSlice.util.resetApiState());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="text-white bg-black py-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to={"/"}>
          <h2 className="font-extrabold text-3xl">FASH.COM</h2>
        </Link>
        <SearchBox />
        <div className="flex items-center gap-4 cursor-pointer">
          <div className="relative">
            <ShoppingCart onClick={toggleCart} />
            <span className="text-xs bg-red-500 rounded-full  w-4 h-4 absolute text-center -top-2 -right-3">
              {productInCart}
            </span>
          </div>
          {userInfo ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <User />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Link to={"/profile"}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={isLoading}
                  className="cursor-pointer"
                  onClick={logoutHandler}
                >
                  <span className="text-red-600">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to={"/login"}>
              <LogIn />
            </Link>
          )}
          {currentUser?.role === "admin" && (
            <Link
              to={"/admin/dashboard"}
              className="bg-yellow-500 p-2 text-black font-medium text-sm rounded-md"
            >
              Go to dashboard
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}

export default Topbar;
