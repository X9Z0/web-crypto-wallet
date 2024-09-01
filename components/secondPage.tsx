"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import solana from "@/public/solana-sol-logo.svg";
import eth from "@/public/ethereum-eth-logo.svg";
import { motion } from "framer-motion";
export default function SecondPage() {
  return (
    <div className="flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="flex justify-center items-center p-2"
      >
        <Button
          className="w-96 h-16 text-xl flex justify-start bg-[#202026] hover:bg-[#131219]"
          variant={"ghost"}
        >
          <Image
            className="h-5 w-5 mr-4"
            src={solana}
            alt=""
            width="32"
            height="32"
          />
          Solana
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="flex justify-center items-center p-2 "
      >
        <Button
          className="w-96 h-16 text-xl flex justify-start bg-[#202026] hover:bg-[#131219]"
          variant={"ghost"}
        >
          <Image
            className="h-5 w-5 mr-4"
            src={eth}
            alt=""
            width="32"
            height="32"
          />
          Ethereum
        </Button>
      </motion.div>
    </div>
  );
}
