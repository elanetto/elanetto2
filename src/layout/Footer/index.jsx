export function Footer() {
  return (
    <footer className="bg-pink-950 h-60 w-full text-white flex justify-center items-center">
      <div className="text-sm text-center">
        <p>© {new Date().getFullYear()} Anette Therese Lindberg</p>
        <p className="italic text-xs pt-4">
          Denne nettsiden er laget av Anette Therese Lindberg,
        </p>
        <p className="italic text-xs">utdannet FrontEnd Developer.</p>
        <p className="italic text-xs pt-4">
          Trenger du hjelp med å sette opp en nettside?
        </p>
        <p className="italic text-xs">
          Se min{" "}
          <a
            href="https://anette-portfolio.onrender.com/"
            className="underline hover:font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            portfolio
          </a>{" "}
          og ta kontakt{" "}
          <a
            href="https://anette-portfolio.onrender.com/contact"
            className="underline hover:font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            her
          </a>
        </p>
      </div>
    </footer>
  );
}
