import { Link } from "react-router";
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
import { useLogoutMutation } from "@/store/slices/userApi";

function Topbar({ toggleCart }: TopbarProps) {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch();
  const [logoutMutation, { isLoading }] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutMutation({});
      dispatch(clearUserInfo());
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
          <ShoppingCart onClick={toggleCart} />
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
        </div>
      </div>
    </main>
  );
}

export default Topbar;
