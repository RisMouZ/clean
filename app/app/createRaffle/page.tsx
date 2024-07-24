"use client";

import React from "react";
import Navbar from "../components/Navbar";
import CreateRaffle from "../components/CreateRaffle";
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
        <CreateRaffle />
      </div>
    </div>
  );
};

export default createRaffle;
