import Script from "next/script";

export default function AdBanner() {
  return (
    <>
      {/* Container for the ad */}
      <div id="atContainer-f921f56f79f37dec913635d48843bd46"></div>

      {/* Setup options */}
      <Script id="ad-options" strategy="afterInteractive">
        {`
          if (typeof atAsyncOptions !== 'object') var atAsyncOptions = [];
          atAsyncOptions.push({
              key: 'f921f56f79f37dec913635d48843bd46',
              format: 'js',
              async: true,
              container: 'atContainer-f921f56f79f37dec913635d48843bd46',
              params: {}
          });
        `}
      </Script>

      {/* Load script */}
      <Script
        id="ad-invoke"
        strategy="afterInteractive"
        src="https://www.highperformanceformat.com/f921f56f79f37dec913635d48843bd46/invoke.js"
      />
    </>
  );
}
