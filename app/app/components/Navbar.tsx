"use client";

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import { confirmTx, connection, program } from '../anchor/setup';
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";
import { useAnchorClient } from "./AnchorClientProvider";
import { set } from "@coral-xyz/anchor/dist/cjs/utils/features";

const Navbar = () => {
  //@ts-ignore
  const { takeUserPDA, takeUserStats, createAccount } = useAnchorClient();
  const [userRaffleCount, setUserRaffleCount] = useState<any>();
  const [userWinCount, setUserWinCount] = useState<any>();
  const [userAccountt, setUserAccountt] = useState();
  const [userStatss, setUserStatss] = useState();
  const wallet = useAnchorWallet();

  const [walletPublicKey, setWalletPublicKey] = useState<any>(undefined);

  useEffect(() => {
    setWalletPublicKey(wallet?.publicKey);
    userAccount();
  });

  const userAccount = async () => {
    const userAccount = await takeUserPDA(wallet?.publicKey);
    console.log("User Stats ?????", userAccount);
  };

  return (
    <div>
      {/* crée une Navbar en tailwind minimalist */}
      <nav
        className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono"
        role="navigation"
      >
        <Link href="/" className="pl-8">
          RaffleT
        </Link>
        <div className="pr-8">
          <Link href="/explore" className="p-4">
            Explore
          </Link>
          <Link href="/createRaffle" className="p-4">
            Create Raffle
          </Link>
          <Link href="/dashboard" className="p-4">
            Dashboard
          </Link>
          <WalletMultiButton />
        </div>
      </nav>
      {userRaffleCount == undefined ? (
        <button
          className="p-4 bg-blue-500 text-white"
          onClick={() => createAccount(walletPublicKey)}
        >
          Créer un compte
        </button>
      ) : (
        <div>
          <p>Raffles créées {userRaffleCount}</p>
          <p>Raffles remportées {userWinCount}</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
