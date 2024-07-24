"use client";

import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import { program } from "../anchor/setup";
import { PublicKey } from "@solana/web3.js";

const User = async () => {
  const [user, setUser] = useState();

  const takeUser = await program.account.user.all();
  console.log("Tableau des Users", takeUser);

  const takeUserPDA = async (wallet: {
    toBuffer: () => Uint8Array | Buffer;
  }) => {
    return await PublicKey.findProgramAddress(
      [wallet.toBuffer()],
      program.programId
    );
  };

  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  console.log("wallet", wallet);

  return <div></div>;
};

export default User;
