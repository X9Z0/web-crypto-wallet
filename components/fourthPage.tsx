"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Grid2X2, List } from "lucide-react";
import { TileWallet } from "./tile-wallet";

import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { hdkey } from "ethereumjs-wallet";
import { toast } from "sonner";
import { motion } from "framer-motion";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Wallet {
  id: number;
  privatekey: string;
  publickey: string;
}

// const dummywallets: Wallet[] = [
//   {
//     id: 1,
//     privatekey:
//       "a1b2c3d4e5f6g7h8i9j0klmnopqrstuvwx1234yz5678abcd90efghijklmnop",
//     publickey: "efghijklmnop1234mnopqrstuvwx5678abcdefghi90jklmnopqrstuvwx",
//   },
//   {
//     id: 2,
//     privatekey:
//       "b1c2d3e4f5g6h7i8j9k0lmnopqrstuvwxy123z456abcd7890efghijklmnopqr",
//     publickey: "mnopqrstuvwx1234abcdefghi5678jklmnopqrstuvwx90efghijklmnopqrst",
//   },
//   {
//     id: 3,
//     privatekey:
//       "c1d2e3f4g5h6i7j8k9l0mnopqrstuvwxy12z34567abcd890efghijklmnopqrs",
//     publickey: "ijklmnopqrstuvwx90abcdefghijk5678lmnopqrstuvwx1234efghijklmnop",
//   },
// ];

interface FourthProps {
  seed: Buffer;
  pathType: string;
}
export default function FourthPage({ seed, pathType }: FourthProps) {
  const [gridView, setGridView] = useState<boolean>(false);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [walletCount, setWalletCount] = useState<number>(1);

  useEffect(() => {
    const walletLS = localStorage.getItem("wallet");
    const walletCountLS = localStorage.getItem("count");
    if (walletLS && walletCountLS) {
      setWallets(JSON.parse(walletLS));
      setWalletCount(JSON.parse(walletCountLS));
    }
  }, []);

  const addWallet = () => {
    const path = `m/44'/${pathType}'/${walletCount}'/0'`;

    // Initialize variables
    let privatekeyEncoded: string = "";
    let publickeyEncoded: string = "";

    if (pathType === "501") {
      // Solana derivation
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);
      const privateKey = keyPair.secretKey.slice(0, 32); // Extract the private key
      privatekeyEncoded = Buffer.from(privateKey).toString("hex"); // Convert to hex
      publickeyEncoded = Keypair.fromSecretKey(
        keyPair.secretKey
      ).publicKey.toBase58();
    } else if (pathType === "60") {
      // Ethereum derivation
      const hdWallet = hdkey.fromMasterSeed(seed);
      const wallet = hdWallet.derivePath(path).getWallet();
      privatekeyEncoded = wallet.getPrivateKey().toString("hex"); // Convert to hex
      publickeyEncoded = wallet.getPublicKey().toString("hex"); // Convert to hex
    } else {
      // Handle unexpected pathType
      toast.error(`unsupported path type ${pathType}`);
      return; // Exit function if pathType is not supported
    }
    const newWallet: Wallet = {
      id: walletCount,
      privatekey: privatekeyEncoded,
      publickey: publickeyEncoded,
    };
    setWallets((prevWallets) => {
      const updatedWallets = [...prevWallets, newWallet];
      localStorage.setItem("wallet", JSON.stringify(updatedWallets));
      return updatedWallets;
    });
    setWalletCount((prevCount) => {
      const updatedCount = prevCount + 1;
      localStorage.setItem("count", JSON.stringify(updatedCount));
      return updatedCount;
    });
    toast.success("new Wallet is added!");
  };

  const deleteAll = () => {
    localStorage.removeItem("path");
    localStorage.removeItem("seed");
    localStorage.removeItem("count");
    localStorage.removeItem("wallet");
    setWallets([]);
    setWalletCount(1);
    toast.success("wallets deleted successfully");
  };

  const deleteACard = (id: number) => {
    const updatedWallets = wallets.filter((wallet) => wallet.id !== id);
    const updatedCount = updatedWallets.length;

    setWallets(updatedWallets);
    setWalletCount(updatedCount);

    localStorage.setItem("wallet", JSON.stringify(updatedWallets));
    localStorage.setItem("count", JSON.stringify(updatedCount));

    toast.success("Wallet deleted successfully!");
  };

  return (
    <div className="mx-auto h-full w-2/3 flex-none">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="flex justify-between p-2 mt-2"
      >
        <div className="p-2 font-bold font- text-center text-4xl">
          <h1>{pathType === "501" ? "Solana" : "Ethereum"} Wallet</h1>
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"} className="h-10">
                Delete all wallet
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absoultely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will delete all the wallet and the process will
                  restart
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteAll}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button className="h-10" onClick={addWallet}>
            Add wallet
          </Button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={`p-4 ${
          gridView ? "flex gap-4 flex-col" : "grid-container"
        } `}
      >
        {wallets.map((wallet) => (
          <TileWallet
            onDelete={deleteACard}
            privatekey={wallet.privatekey}
            publickey={wallet.publickey}
            id={wallet.id}
          />
        ))}
      </motion.div>
    </div>
  );
}
