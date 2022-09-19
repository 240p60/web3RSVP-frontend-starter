import Layout from "../components/Layout";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

export default function MyApp({ Component, pageProps }) {
  const alchemyID = process.env.NEXT_PUBLIC_ALCHEMY_ID;

  const { chains, provider } = configureChains(
    [chain.polygon],
    [alchemyProvider({ alchemyID }), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "web3rsvp",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
