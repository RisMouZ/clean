import { AnchorProvider, IdlAccounts, Program } from "@coral-xyz/anchor";
import { IDL } from "./idl";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

const programId = new PublicKey("CKt7TmvijVPm7xgGPBXXDnemzjnaNHAiXPAKWDxpYQmV");
export const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// const wallet = useAnchorWallet();

// if (!wallet) {
//   throw new Error("Wallet is undefined.");
// }

// const provider = new AnchorProvider(connection, wallet, {
//   commitment: "confirmed",
// });

// export const program = new Program(IDL, programId, {
//   connection,
// });

// export const [counterPDA] = PublicKey.findProgramAddressSync(
//   [Buffer.from("counter")],
//   program.programId
// );

// export const getProgram = (connection: any, wallet: any) => {
//   const provider = new AnchorProvider(connection, wallet, {
//     commitment: "confirmed",
//   });
//   const program = new Program(IDL, programId, provider);
//   return program;
// };

// export const mockWallet = () => {
//   return {};
// };

export const confirmTx = async (txHash: any, connection: any): Promise<any> => {
  const blockHashInfo = await connection.getLatestBlockhash();
  await connection.confirmTransaction({
    blockhash: blockHashInfo.blockhash,
    lastValidBlockHeight: blockHashInfo.lastValidBlockHeight,
    signature: txHash,
  });
};
// export type CounterData = IdlAccounts<Clean>["Clean"];
