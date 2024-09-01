"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { motion } from "framer-motion";
import { useState } from "react";
import solana from "@/public/solana-sol-logo.svg";
import eth from "@/public/ethereum-eth-logo.svg";
import Image from "next/image";

export default function MainPage() {
  const [firstPage, setFirstPage] = useState(true);
  const [secnodPage, setSecondPage] = useState(false);

  return (
    <>
      {firstPage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="flex gap-4 flex-col my-12"
        >
          <div className="p-6 mb-6 flex justify-center items-center">
            <Avatar className="aspect-square relative flex h-32 w-32 shrink-0 overflow-hidden rounded-full">
              <AvatarImage src="https://avatars.slack-edge.com/2019-11-18/838548423060_e47f8b5cc8f5aa7a75da_512.png" />
              <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                MW
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="text-center text-4xl font-bold p-4">
            <h1>Welcome to T-wallet</h1>
          </div>
          <div className="p-4 flex justify-center items-center">
            <Button
              className="h-10 w-56 text-lg"
              onClick={() => {
                setFirstPage(false);
                setSecondPage(true);
              }} // Hide the first page when the button is clicked
            >
              Create a wallet
            </Button>
          </div>
        </motion.div>
      )}
      {secnodPage && (
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
      )}
    </>
  );
}
