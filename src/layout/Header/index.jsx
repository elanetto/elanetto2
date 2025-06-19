import logo from "./../../assets/branding/elanettoDesign-logo-dirty-pink.svg";
import logoDark from "./../../assets/branding/elanettoDesign-logo-dark-pink.svg";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] py-6 px-4 md:px-2 flex justify-between items-center text-green-900">
        <Link
          to="/"
          className="relative group h-10 w-auto inline-block cursor-pointer"
        >
          {/* Default logo */}
          <img
            src={logo}
            alt="Logo for Anette Therese"
            className="h-12 transition-opacity duration-300 opacity-100 group-hover:opacity-0"
          />
          {/* Hover logo */}
          <img
            src={logoDark}
            alt="Hover logo for Anette Therese"
            className="h-12 transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute top-0 left-0"
          />
        </Link>
        <Link to="/om"
        className="text-dirtyrosa hover:text-pink-950"
        >Om elanetto</Link>
      </div>
    </header>
  );
}
