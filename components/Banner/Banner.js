"use client";

import React, { useEffect, useContext } from "react";

export default function AdBanner() {

  useEffect(() => {
    // Clear container
    const containerId = "atContainer-f921f56f79f37dec913635d48843bd46";
    const container = document.getElementById(containerId);
    if (container) container.innerHTML = "";

    // Reset ad options global
    window.atAsyncOptions = window.atAsyncOptions || [];
    window.atAsyncOptions.push({
      key: "f921f56f79f37dec913635d48843bd46",
      format: "js",
      async: true,
      container: containerId,
      params: {}
    });

    // Create script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src =
      (location.protocol === "https:" ? "https:" : "http:") +
      "//www.highperformanceformat.com/f921f56f79f37dec913635d48843bd46/invoke.js";

    document.head.appendChild(script);

    // Cleanup when reloading
    return () => {
      script.remove();
    };
  }, []); // re-run when page changes

  return <div id="atContainer-f921f56f79f37dec913635d48843bd46"></div>;
}
