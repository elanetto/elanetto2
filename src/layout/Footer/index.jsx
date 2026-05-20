import { FaTiktok, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-brun-02 w-full text-white py-10 px-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm">

        <div className="text-center md:text-left">
          <p className="font-semibold">
            © {new Date().getFullYear()} Anette Therese Lindberg
          </p>

          <p className="text-xs italic mt-1 opacity-80">
            Illustratør og FrontEnd Developer
          </p>

          <p className="text-xs italic mt-3 opacity-80">
            Trenger du hjelp med å sette opp en nettside?{" "}
            <a
              href="https://kodera.no/"
              className="underline hover:opacity-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              Se kodera.no
            </a>
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3">
          <p className="text-xs uppercase tracking-widest opacity-60">
            Følg meg
          </p>

          <div className="flex gap-4">
            <a
              href="https://www.tiktok.com/@elanetto.design"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition"
              aria-label="TikTok"
            >
              <FaTiktok size={22} />
            </a>

            <a
              href="https://www.instagram.com/elanetto.design/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition"
              aria-label="Instagram"
            >
              <FaInstagram size={22} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}