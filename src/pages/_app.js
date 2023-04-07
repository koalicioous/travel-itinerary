import "@/styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Toaster } from "react-hot-toast";
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}
