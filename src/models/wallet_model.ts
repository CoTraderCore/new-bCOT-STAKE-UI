import Web3 from "web3";
import Web3Modal from "web3modal";
import Authereum from "authereum";
import Fortmatic from "fortmatic";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useState } from "react";

export default function Wallet_Model() {
  const [loading, setLoading] = useState(false);
  
  return {
    get web3Loading() {
      return loading;
    },
    async getweb3() {
      
      setLoading(true);
      let web3Modal;
      let web3;
      let providerOptions;
      providerOptions = {
        authereum: {
          package: Authereum, // required
        },

        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId: "https://mainnet.infura.io/v3/36b6921562ec407e826fb24562a5c9db" // required
          }
        },

        fortmatic: {
          package: Fortmatic, // required
          options: {
            key: "pk_live_7E6A277E15DE415B" // required
          }
        }
      };

      
      web3Modal = new Web3Modal({
        network:
          "mainnet",
        cacheProvider: true,
        providerOptions,
      });

      const provider = await web3Modal.connect();

      provider.on("accountsChanged", (accounts: string[]) => {
        console.log(accounts);
      });
      
      // Subscribe to chainId change
      provider.on("chainChanged", (chainId: number) => {
        console.log(chainId);
      });
      
      // Subscribe to provider connection
      provider.on("connect", (info: { chainId: number }) => {
        console.log(info);
      });
      
      // Subscribe to provider disconnection
      provider.on("disconnect", (error: { code: number; message: string }) => {
        console.log(error);
      });
      
      web3 = new Web3(provider);
      setLoading(false);
      return web3;
    },
  };
}
