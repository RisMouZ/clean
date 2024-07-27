"use client";

import React from "react";
import Navbar from "../components/Navbar";
import NftDashboard from "../components/NftDashboard";

const createRaffle = () => {
  return (
    <div>
      {" "}
      <div>
        <Navbar />
        <div className="flex justify-center items-center">
          <h1>Create Raffle</h1>
        </div>
        <div className="flex justify-center items-center h-screen">
          <NftDashboard />
        </div>
      </div>
    </div>
  );
};

export default createRaffle;
