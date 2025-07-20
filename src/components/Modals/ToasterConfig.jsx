import { Toaster } from "react-hot-toast";

const successGreen = "oklch(72.3% 0.219 149.579)";
const errorRed = "oklch(63.7% 0.237 25.331)";
const loadingBlue = "oklch(62.3% 0.214 259.815)";

export default function ToasterConfig() {
  return (
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          color: "white",
          fontWeight: "bold",
          borderRadius: "6px",
        },
        success: {
          style: {
            background: successGreen,
          },
          iconTheme: {
            primary: "white",
            secondary: successGreen,
          },
        },
        error: {
          style: {
            background: errorRed,
          },
          iconTheme: {
            primary: "white",
            secondary: errorRed,
          },
        },
        loading: {
          style: {
            background: loadingBlue,
          },
          iconTheme: {
            primary: "white",
            secondary: loadingBlue,
          },
        },
      }}
    />
  );
}
