import { useEffect, useRef, useState } from "react";

export default function Banner() {
  const banner = useRef(null);
  const [isLocalhost, setIsLocalhost] = useState(false);

  useEffect(() => {
    // Check hostname on client only
    setIsLocalhost(window.location.hostname === "localhost");

    if (banner.current && window.location.hostname !== "localhost" && !banner.current.firstChild) {
      const conf = document.createElement("script");
      conf.type = "text/javascript";
      conf.innerHTML = `
        atOptions = {
          key: 'f921f56f79f37dec913635d48843bd46',
          format: 'iframe',
          height: 90,
          width: 728,
          params: {}
        };
      `;

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "//www.highperformanceformat.com/f921f56f79f37dec913635d48843bd46/invoke.js";

      banner.current.appendChild(conf);
      banner.current.appendChild(script);
    }
  }, []);

  return (
    <div
      ref={banner}
      style={{
        width: "728px",
        height: "90px",
        margin: "20px auto",
        textAlign: "center",
        lineHeight: "90px",
        backgroundColor: isLocalhost ? "#ccc" : "transparent",
        color: "#000",
      }}
    >
      {isLocalhost ? "Ad Placeholder (localhost)" : null}
    </div>
  );
}
