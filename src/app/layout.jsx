import "./globals.css";
import ReduxProvider from "../redux/Provider";
import { ErrorBoundary } from "../Components/ErrorBoundary";
import LayoutWrapper from "../Components/LayoutWrapper";
import PrivateRoute from "../Components/PrivateRoute";
import ClientWrapper from "../Components/ClientWrapper";
import { Toaster } from 'react-hot-toast';
import Providers from "./providers";
import TokenSaver from "../Components/TokenSaver";

export const metadata = {
  title: "SHOP.CO",
  description: "Effortless Urban Style.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased relative">
        <ErrorBoundary>
          <ReduxProvider>
            <PrivateRoute>
              <LayoutWrapper>
                <Toaster position="top-center" reverseOrder={false} />
                <ClientWrapper>
                  <Providers>
                    <TokenSaver/>
                    {children}
                  </Providers>
                </ClientWrapper>
              </LayoutWrapper>
            </PrivateRoute>
          </ReduxProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
