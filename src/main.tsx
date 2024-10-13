import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// import { ChakraProvider } from "@chakra-ui/react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextUIProvider>
      <ConnectionProvider endpoint={import.meta.env.VITE_DEVNET_SERVER}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <main className="min-h-screen dark text-foreground bg-background antialiased">
              <App />
            </main>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </NextUIProvider>
  </StrictMode>
);