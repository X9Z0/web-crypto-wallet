"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Grid2X2, List } from "lucide-react";
import { TileWallet } from "./tile-wallet";

interface Wallet {
  privatekey: string;
  publickey: string;
}

interface FourthProps {
  memonics: string;
  pathType: string;
}
export default function FourthPage({ memonics, pathType }: FourthProps) {
  const [gridView, setGridView] = useState<boolean>(false);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  return (
    <div className=" mx-auto h-full w-2/3">
      <div className="flex justify-between p-2 mt-2">
        <div className="p-2 font-bold font- text-center text-4xl">
          <h1>Solana Wallet</h1>
        </div>
        <div className="flex justify-center items-center gap-3 p-2">
          <Button
            onClick={() => {
              {
                gridView ? setGridView(false) : setGridView(true);
              }
            }}
            variant={"secondary"}
          >
            {gridView ? <Grid2X2 /> : <List />}
          </Button>
          <Button variant={"destructive"} className="h-10">
            Delete all wallet
          </Button>
          <Button className="h-10">Add wallet</Button>
        </div>
      </div>
      <div
        className={`p-4 ${
          gridView ? "flex gap-4 flex-col" : "grid-container"
        } `}
      >
        <TileWallet
          publickey="hfbdksfjdahb4134fjhbsfjsh kjf"
          privatekey="fhbadkfjshb38745hefbkwjhfkasjfh"
        />
        <TileWallet
          publickey="hfbdksfjdahb4134fjhbsfjsh kjf"
          privatekey="fhbadkfjshb38745hefbkwjhfkasjfh"
        />
        <TileWallet
          publickey="hfbdksfjdahb4134fjhbsfjsh kjf"
          privatekey="fhbadkfjshb38745hefbkwjhfkasjfh"
        />
        <TileWallet
          publickey="hfbdksfjdahb4134fjhbsfjsh kjf"
          privatekey="fhbadkfjshb38745hefbkwjhfkasjfh"
        />
        <TileWallet
          publickey="hfbdksfjdahb4134fjhbsfjsh kjf"
          privatekey="fhbadkfjshb38745hefbkwjhfkasjfh"
        />
      </div>
    </div>
  );
}
