/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/clean.json`.
 */
// export type Clean = {
//   address: "EWDAaD1x8rQ76uf4bJuXRxqXepBrhPH8ZQ5jw5ddFCfH";
//   metadata: {
//     name: "clean";
//     version: "0.1.0";
//     spec: "0.1.0";
//     description: "Created with Anchor";
//   };
//   instructions: [
//     {
//       name: "initUser";
//       discriminator: [14, 51, 68, 159, 237, 78, 158, 102];
//       accounts: [
//         {
//           name: "user";
//           writable: true;
//           pda: {
//             seeds: [
//               {
//                 kind: "account";
//                 path: "signer";
//               }
//             ];
//           };
//         },
//         {
//           name: "signer";
//           writable: true;
//           signer: true;
//         },
//         {
//           name: "systemProgram";
//           address: "11111111111111111111111111111111";
//         }
//       ];
//       args: [];
//     }
//   ];
//   accounts: [
//     {
//       name: "user";
//       discriminator: [159, 117, 95, 227, 239, 151, 58, 236];
//     }
//   ];
//   types: [
//     {
//       name: "user";
//       type: {
//         kind: "struct";
//         fields: [
//           {
//             name: "raffleCount";
//             type: "u32";
//           },
//           {
//             name: "winCount";
//             type: "u16";
//           }
//         ];
//       };
//     }
//   ];
// };

export const IDL = {
  version: "0.1.0",
  name: "raffle_t",
  instructions: [
    {
      name: "initUser",
      accounts: [
        { name: "user", isMut: true, isSigner: false },
        { name: "signer", isMut: true, isSigner: true },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [],
    },
    {
      name: "createRaffle",
      accounts: [
        { name: "signer", isMut: true, isSigner: true },
        { name: "signerTokenAccount", isMut: true, isSigner: false },
        { name: "nftMint", isMut: false, isSigner: false },
        { name: "user", isMut: true, isSigner: false },
        { name: "raffle", isMut: true, isSigner: false },
        { name: "raffleTokenAccount", isMut: true, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false },
        { name: "rent", isMut: false, isSigner: false },
        { name: "associatedTokenProgram", isMut: false, isSigner: false },
      ],
      args: [
        { name: "nftAddress", type: "publicKey" },
        { name: "maxTickets", type: "u32" },
        { name: "ticketsPrice", type: "u32" },
        { name: "endWithDeadline", type: "bool" },
        { name: "deadline", type: "u32" },
      ],
    },
    {
      name: "buy",
      accounts: [
        { name: "raffle", isMut: true, isSigner: false },
        { name: "buyer", isMut: true, isSigner: false },
        { name: "user", isMut: false, isSigner: false },
        { name: "signer", isMut: true, isSigner: true },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [],
    },
    {
      name: "draw",
      accounts: [
        { name: "raffle", isMut: true, isSigner: false },
        { name: "signer", isMut: true, isSigner: true },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [],
    },
    {
      name: "withdrawSol",
      accounts: [
        { name: "raffle", isMut: true, isSigner: false },
        { name: "signer", isMut: true, isSigner: true },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [],
    },
    {
      name: "withdrawNft",
      accounts: [
        { name: "signer", isMut: true, isSigner: true },
        { name: "buyer", isMut: false, isSigner: false },
        { name: "raffle", isMut: true, isSigner: false },
        { name: "raffleTokenAccount", isMut: true, isSigner: false },
        { name: "nftMint", isMut: false, isSigner: false },
        { name: "user", isMut: true, isSigner: false },
        { name: "signerTokenAccount", isMut: true, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false },
        { name: "rent", isMut: false, isSigner: false },
        { name: "associatedTokenProgram", isMut: false, isSigner: false },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "User",
      type: {
        kind: "struct",
        fields: [
          { name: "raffleCount", type: "u32" },
          { name: "winCount", type: "u16" },
        ],
      },
    },
    {
      name: "Raffle",
      type: {
        kind: "struct",
        fields: [
          { name: "seller", type: "publicKey" },
          { name: "raffleNumber", type: "u32" },
          { name: "nftAddress", type: "publicKey" },
          { name: "maxTickets", type: "u32" },
          { name: "ticketPrice", type: "u32" },
          { name: "endWithDeadline", type: "bool" },
          { name: "ticketsCount", type: "u32" },
          { name: "deadline", type: "u32" },
          { name: "raffleInProgress", type: "bool" },
          { name: "winningTicket", type: "i32" },
        ],
      },
    },
    {
      name: "Buyer",
      type: {
        kind: "struct",
        fields: [{ name: "buyerAddress", type: "publicKey" }],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "SellerCantBeBuyer",
      msg: "You cannot participate in raffles of which you are the creator.",
    },
    { code: 6001, name: "RaffleNotEnded", msg: "Draw conditions not met" },
    {
      code: 6002,
      name: "NotTheSeller",
      msg: "You're not the creator of this raffle",
    },
    {
      code: 6003,
      name: "AllTicketsSelling",
      msg: "All the tickets are selling",
    },
    {
      code: 6004,
      name: "CreateUserAccount",
      msg: "Create a user account for this wallet",
    },
    {
      code: 6005,
      name: "RaffleNotFinished",
      msg: "This raffle isn't finished",
    },
    { code: 6006, name: "RaffleEnded", msg: "This raffle is finished" },
    {
      code: 6007,
      name: "DeadlineNotCorrect",
      msg: "The deadline is not correct",
    },
    { code: 6008, name: "NotTheWinner", msg: "You're not the winner" },
  ],
};
