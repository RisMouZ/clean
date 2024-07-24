import React, { useEffect, useState } from "react";
import { fetchDigitalAsset } from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { connection } from "./AnchorClientProvider";
import axios from "axios";

const NftCard = ({ nft }: any) => {
  const uri = nft.data.uri;
  const [image, setImage] = useState();

  useEffect(() => {
    axios.get(uri).then((response) => setImage(response.data.image));
  });

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg" src={image} alt="" />

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {nft.data.name}
        </h5>
      </div>
    </div>
  );
};

export default NftCard;

// <div>
//   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
//     <img src={image} alt="NFT" className="w-full h-40 object-cover mb-4" />
//     <p className="text-center text-gray-800 font-semibold">
//       {nft.data.name}
//     </p>
//   </div>
// </div>
