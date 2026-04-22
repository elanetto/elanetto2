import logo from "./../../assets/branding/elanettoDesign-logo-dirty-pink.svg";
import logoDark from "./../../assets/branding/elanettoDesign-logo-dark-pink.svg";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";

export function Header() {
  const cart = useCartStore((state) => state.cart);

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <header className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] py-6 px-4 md:px-2 flex justify-between items-center text-green-900">
        
        {/* LOGO */}
        <Link
          to="/"
          className="relative group h-10 w-auto inline-block cursor-pointer"
        >
          <img
            src={logo}
            alt="Logo for Anette Therese"
            className="h-12 transition-opacity duration-300 opacity-100 group-hover:opacity-0"
          />
          <img
            src={logoDark}
            alt="Hover logo for Anette Therese"
            className="h-12 transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute top-0 left-0"
          />
        </Link>

        {/* NAV RIGHT */}
        <div className="flex items-center gap-6">
          
          {/* OM */}
          <Link
            to="/om"
            className="text-dirtyrosa chewy-regular font-bold text-xl hover:text-pink-950"
          >
            Om elanetto
          </Link>

          {/* HANDLEKURV */}
          <Link
            to="/handlekurv"
            className="relative text-2xl hover:scale-110 transition"
          >
            🛒

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#6e3b34] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

        </div>
      </div>
    </header>
  );
}