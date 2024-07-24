"use client";

import { createContext, useState, useEffect, useMemo, useContext } from "react";
import {
  SystemProgram,
  PublicKey,
  clusterApiUrl,
  Connection,
} from "@solana/web3.js";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";

import { ReactNode } from "react";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { IDL } from "../anchor/idl";
import { confirmTx } from "../anchor/setup";

const programId = new PublicKey("CKt7TmvijVPm7xgGPBXXDnemzjnaNHAiXPAKWDxpYQmV");
export const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const AnchorClientContext = createContext(undefined);

interface AnchorClientProviderProps {
  children: ReactNode;
}

export const AnchorClientProvider = ({
  children,
}: AnchorClientProviderProps) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [walletPublicKey, setWalletPublicKey] = useState<any>();

  const { connection } = useConnection();

  const wallet = useAnchorWallet();
  console.log("ANCHOR", wallet);

  const provider = new AnchorProvider(connection, wallet!, {
    commitment: "confirmed",
  });

  //@ts-ignore
  const program = new Program(IDL, programId, provider);

  const takeUser = async () => {
    const tabUser = await program.account.user.all();
    console.log("Tableau des Users", tabUser);
  };

  const takeUserPDA = async (wallet: any) => {
    const userPDA = await PublicKey.findProgramAddress(
      [wallet.toBuffer()],
      program.programId
    );
    const takeUserAccount = await program.account.user.fetch(userPDA[0]);
    console.log("User Account", takeUserAccount);

    // return await program.account.user.fetch(userPDA[0]);
  };
  const takeUserStats = async (PDA: any) => {};

  const createAccount = async (wallet: any) => {
    const userAccount = await PublicKey.findProgramAddress(
      [wallet.toBuffer()],
      program.programId
    );
    console.log("userAccount", userAccount[0]);

    const tx = program.methods
      .initUser()
      .accounts({
        signer: walletPublicKey,
        //@ts-ignore
        user: userAccount[0],
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log("tx", tx);

    await confirmTx(tx, connection);
  };

  return (
    //@ts-ignore
    <AnchorClientContext.Provider
      //@ts-ignore
      value={{ takeUserPDA, createAccount, takeUserStats }}
    >
      {" "}
      {children}{" "}
    </AnchorClientContext.Provider>
  );
};

export const useAnchorClient = () => {
  return useContext(AnchorClientContext);
};
