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
import { confirmTx, getATA } from "../anchor/setup";
import createRaffle from "../createRaffle/page";
import { getAssociatedTokenAddress } from "@solana/spl-token";

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
  const [userRaffleCount, setUserRaffleCount] = useState<any>();
  const [userWinCount, setUserWinCount] = useState<any>();

  const { connection } = useConnection();

  const wallet = useAnchorWallet();
  console.log("ANCHOR", wallet);

  useEffect(() => {
    takeUser();
    takeUserPDA(wallet?.publicKey);
  }, [wallet]);
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
    console.log("User PDA", userPDA);

    const takeUserAccount = await program.account.user.fetch(userPDA[0]);

    setUserRaffleCount(takeUserAccount.raffleCount);
    setUserWinCount(takeUserAccount.winCount);
  };

  const createAccount = async (wallet: any) => {
    const userAccount = await PublicKey.findProgramAddress(
      [wallet.toBuffer()],
      program.programId
    );

    const tx = program.methods
      .initUser()
      .accounts({
        signer: wallet.publicKey,
        user: userAccount[0],
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log("tx", tx);

    await confirmTx(tx, connection);
  };

  const createRaffle = async (
    mintAddress: any,
    price: any,
    endWithDeadline: any,
    maxTickets: any,
    deadline: number
  ) => {
    const userWallet = wallet?.publicKey;
    const userPDA = await PublicKey.findProgramAddress(
      [userWallet!.toBuffer()],
      program.programId
    );

    // const rafflePDA

    const PdaAta = await getAssociatedTokenAddress;
    console.log("createRaffle");
  };

  return (
    //@ts-ignore
    <AnchorClientContext.Provider
      //@ts-ignore
      value={{ takeUserPDA, createAccount, createRaffle, program }}
    >
      {" "}
      {children}{" "}
    </AnchorClientContext.Provider>
  );
};

export const useAnchorClient = () => {
  return useContext(AnchorClientContext);
};
