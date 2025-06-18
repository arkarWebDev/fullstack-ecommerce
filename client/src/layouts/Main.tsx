import { Outlet } from "react-router";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

function Main() {
  return (
    <section>
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
}

export default Main;
