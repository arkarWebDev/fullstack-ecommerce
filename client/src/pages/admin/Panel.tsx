import { Outlet } from "react-router";
import SideBar from "../../components/admin/SideBar";

function Panel() {
  return (
    <section className="grid grid-cols-10">
      <div className=" col-span-2">
        <SideBar />
      </div>
      <div className="col-span-8">
        <Outlet />
      </div>
    </section>
  );
}

export default Panel;
