import "@fortawesome/fontawesome-free/css/all.min.css";
import "@styles/globals.css";

import Navbar from "@components/layout/Navbar";
import { Providers } from "../redux/providers";

export const metadata = {
  title: "DevConnector",
  description: "A global place for the developers to connect.",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </Providers>
  );
}
