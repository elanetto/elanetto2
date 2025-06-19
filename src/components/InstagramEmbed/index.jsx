import { useEffect } from "react";

export default function InstagramEmbed() {
  useEffect(() => {
    // Load Instagram's embed script
    const script = document.createElement("script");
    script.setAttribute("src", "//www.instagram.com/embed.js");
    script.setAttribute("async", "");
    document.body.appendChild(script);
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
          <blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/C14nQwPIRhR/" data-instgrm-version="14">
          </blockquote>
        `,
      }}
    />
  );
}
