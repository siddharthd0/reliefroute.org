import "../styles/globals.css";
import Navigation from "../components/navigation";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }) {
  return (
    <>
        <div className="font-custom">
          <Component {...pageProps} />
          <Analytics />
        </div>
    </>
  );
}
