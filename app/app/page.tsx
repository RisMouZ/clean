"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import User from "./components/User";
import Navbar from "./components/Navbar";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import NftDashboard from "./components/NftDashboard";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div>
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col items-center">
            <h1>Welcome to Clean shit !!!</h1>
            <br />

            {/* <User />  */}
            <NftDashboard />
            {/* <br />
                     <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={accountInfo}
                    >
            Créer un compte
                    </button> */}
          </div>
          <div className="flex flex-col items-center"></div>
        </div>
      </div>
    </main>
  );
}
