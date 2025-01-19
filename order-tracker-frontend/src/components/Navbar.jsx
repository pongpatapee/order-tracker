import { Link } from "react-router-dom";
import { FaReact } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="w-full h-16 flex justify-between items-center p-10 bg-blue-500 text-white">
      <div>
        <Link to="/">
          <FaReact size={30} />
        </Link>
      </div>

      <ul className="flex gap-10">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="/order-form">Order Form</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
