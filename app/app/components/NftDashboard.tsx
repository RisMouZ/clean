import { useWalletNfts } from "@nfteyez/sol-rayz-react";
import { Connection } from "@solana/web3.js";
// import type { Options } from "@nfteyez/sol-rayz";
import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import NftCard from "./NftCard";
import { useState } from "react";
import { set } from "@metaplex-foundation/umi/serializers";
import style from "../styles/NftDashboard.module.css";
import { useAnchorClient } from "./AnchorClientProvider";

const NFT = () => {
  const { connection } = useConnection();

  const { publicKey } = useWallet();
  //@ts-ignore
  const { createRaffle } = useAnchorClient();

  const [mintAddress, setMintAddress] = useState("");
  const [maxTickets, setMaxTickets] = useState("");
  const [endWithDeadline, setEndWithDeadline] = useState(false);
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState(0);

  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: publicKey?.toBase58() ?? "",
    connection,
  });

  // console.log("MINT ADDRESS", mintAddress);
  // console.log("End With Deadline", endWithDeadline);
  // console.log("Price", price);

  console.log(nfts);

  const createRaffleGame = () => {
    const currentTimestamp = new Date().getTime() / 1000;
    const durationInSeconds = duration * 24 * 60 * 60;
    const deadline = currentTimestamp + durationInSeconds;

    createRaffle(mintAddress, price, endWithDeadline, maxTickets, deadline);
  };

  if (error) return <div>Have some error</div>;
  if (isLoading) return <div>Loading...</div>;

  const handleChange = () => {
    setEndWithDeadline(!endWithDeadline);
  };

  return (
    <>
      <div className="container ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {nfts.map((nft) => (
            <NftCard
              // onClick={() => takeAddress(nft.data.mint)}
              key={nft.data.mint}
              nft={nft}
            />
          ))}
        </div>
        {/*, maxTickets,deadline */}

        <div className={style.container}>
          <label className={style.label} htmlFor="mintAddress">
            Adresse du NFT
          </label>
          <input
            className={style.input}
            type="text"
            id="mintAddress"
            value={mintAddress}
            onChange={(e) => setMintAddress(e.target.value)}
          />

          <label className={style.label} htmlFor="price">
            Prix de vente totale (en SOL)
          </label>
          <input
            className={style.input}
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label className={style.label} htmlFor="endWithDeadline">
            Raffle avec une deadline
          </label>
          <input
            className={style.input}
            type="checkbox"
            id="endWithDeadline"
            checked={endWithDeadline}
            onChange={handleChange}
          />

          <label className={style.label} htmlFor="maxTickets">
            Nombre de tickets max
          </label>
          <input
            className={style.input}
            type="number"
            id="maxTickets"
            value={maxTickets}
            onChange={(e) => setMaxTickets(e.target.value)}
          />
          <label className={style.label} htmlFor="duration">
            Durée en jour
          </label>
          <input
            className={style.input}
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />

          <a className={style.button} onClick={createRaffleGame}>
            Creer une raffle
          </a>
        </div>
      </div>
    </>
  );
};

export default NFT;
